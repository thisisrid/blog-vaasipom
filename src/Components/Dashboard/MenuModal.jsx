import { IconButton, Typography } from "@material-ui/core";
import {
  Fade,
  Modal,
  makeStyles,
  Backdrop,
  Grid,
  Paper,
} from "@material-ui/core";
import React from "react";
import ArticleIcon from "../../Assets/icons/articleIcon.svg";
import ShortStoryIcon from "../../Assets/icons/shortStoryIcon.svg";
import PodcastIcon from "../../Assets/icons/podcastIcon.svg";
import VideocastIcon from "../../Assets/icons/videocastIcon.svg";
import PoetryIcon from "../../Assets/icons/poetryIcon.svg";
import ReviewIcon from "../../Assets/icons/reviewIcon.svg";
import MenuItemBg from "../../Assets/img/menuItemBg.svg";
import { withTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "750px",
    margin: "0 auto",
    padding: "20px",
  },
  paper: {
    border: `1px solid rgba(196, 196, 196, 0.5)`,
    background: "#FFFFFF",
    textAlign: "center",
    boxShadow: "0px 0px 107px rgba(0, 0, 0, 0.06)",
    borderRadius: "28px",
    padding: theme.spacing(2, 4, 3),
    cursor: "pointer",
  },
  iconHolder: {
    padding: "10px",
    background: `url(${MenuItemBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  icon: {
    height: "60px",
    width: "70px",
    padding: "15px",
  },
  title: {},
}));
const menuList = [
  {
    id: 1,
    title: "Article",
    trans_label: "dash_modal_article",
    write: "article",
    icon: ArticleIcon,
  },
  {
    id: 2,
    title: "Short Story",
    trans_label: "dash_modal_story",
    write: "story",
    icon: ShortStoryIcon,
  },
  {
    id: 3,
    title: "Podcast",
    trans_label: "dash_modal_podcast",
    write: "podcast",
    icon: PodcastIcon,
  },
  {
    id: 4,
    title: "Poetry",
    trans_label: "dash_modal_poetry",
    write: "poetry",
    icon: PoetryIcon,
  },
  {
    id: 5,
    title: "Reviews",
    trans_label: "dash_modal_review",
    write: "review",
    icon: ReviewIcon,
  },
  {
    id: 6,
    title: "Videocast",
    trans_label: "dash_modal_videocast",
    write: "videocast",
    icon: VideocastIcon,
  },
];


const MenuModal = ({ open, handleClose, setWrite, t }) => {
  const classes = useStyles();

  const handleRender = (title) => {
    setWrite(title);
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">
             {t('dash_modal_heading')}
            </h1>
            <Grid container spacing={4}>
              {menuList.map((obj) => (
                <Grid key={obj.id} item xs={4}>
                  <Paper
                    onClick={() => handleRender(obj.write)}
                    className={classes.paper}
                  >
                    <div className={classes.iconHolder}>
                      <IconButton>
                        <img src={obj.icon} className={classes.icon} alt="" />
                      </IconButton>
                    </div>
                    <Typography className={classes.title}>
                      {t(`${obj.trans_label}`)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withTranslation()(MenuModal);
