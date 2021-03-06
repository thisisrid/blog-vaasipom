import React, { useCallback, useEffect, useRef, useState } from "react";
import Feed from "../../Components/Shared/Feed.jsx";
import Header from "../../Components/LandingPage/Header.jsx";
import SubNavigation from "../../Components/LandingPage/SubNavigation.jsx";
import Suggestions from "../../Components/Shared/Suggestions.jsx";
import { Container, Grid, Paper } from "@material-ui/core";
import { landingPageStyles } from "../../Styles/muiStyles.js";
// import Navigation from "./Navigation.jsx";
import { connect } from "react-redux";
import { hideHeader } from "../../redux/actions/headerAction.js";
import { setPage } from "../../redux/actions/dashboardAction";
import { useRouteMatch } from "react-router-dom";
import MuiProgress from "../../muiComponents/MuiProgress.jsx";
import GetPosts from "../../Function/GetPosts.js";

const LandingPage = (props) => {
  const { headerVisible, hideHeader, setPage } = props;
  const classes = landingPageStyles();
  const [pageNo, setPageNo] = useState(1);

  const [categoryItem, setCategoryItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [oldPath, setOldPath] = useState(false);
  const handleOpen = () => {
    setIsLoading(true);
  };
  const handleClose = () => {
    setIsLoading(false);
  };
  const { path } = useRouteMatch();
  useEffect(() => {
    return () => hideHeader();
  }, [path]);
  useEffect(() => {
    document.title = "Blog | Home";
    setPage("");
    path === "/poetry" && setCategoryItem("poetry");
    path === "/story" && setCategoryItem("story");
    path === "/article" && setCategoryItem("article");
    path === "/review" && setCategoryItem("review");
    path === "/" &&
      setCategoryItem("story,article,poetry,review,podcast,videocast");
    // getPost();
  }, [path, pageNo]);

  const { posts, hasMore, loading } = GetPosts(categoryItem, pageNo);
  console.log("🚀 ~ LandingPage ~ posts", {posts})
  const observer = useRef();
  const lastFeedRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNo((prevPage) => prevPage + 1);
          // path === "/" && showHeader();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container maxWidth="lg">
      {!sessionStorage.token && headerVisible && <Header />}
      {/* {path !== "/" && <TopicSlider />} */}
      <SubNavigation />
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="flex-start"
          className={classes.content}
        >
          <Grid item xs={12} sm={8} className={classes.left}>
            <Paper className={classes.paper}>
              {isLoading && (
                <MuiProgress open={handleOpen} close={handleClose} />
              )}
              <Feed data={posts} type="allFeed" loading={loading} />
              {!loading && (
                <p style={{ margin: "0 auto" }} ref={lastFeedRef}>
                  . . .
                </p>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.right}>
            <Paper className={classes.paper}>
              <Suggestions />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  hideHeader: hideHeader,
  setPage: setPage,
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
