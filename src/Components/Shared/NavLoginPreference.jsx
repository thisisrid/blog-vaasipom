import { Avatar, Box, IconButton, Popover } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavigationStyles } from "../../Styles/muiStyles";
import NotifyIcon from "../../Assets/icons/notification.png";
import WriteIcon from "../../Assets/icons/writing.png";
import { BaseUrl } from "../../BaseUrl.config";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setPage, setWriting } from "../../redux/actions/dashboardAction";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import CheckImage from "../../Function/CheckImage";
import placeholderAvatar from "../../Assets/img/dp_placeholder.png";

const NavLoginPreference = ({ setIsLogin, setPage, setWrite, type, t }) => {
  const classes = NavigationStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [userImg, setUserImg] = useState("");

  const getMyProfileInfo = () => {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    };

    !userImg &&
      axios
        .get(BaseUrl + `/myprofile`, { headers })
        .then((response) => {
          setUserImg(response.data.profileImgLink);
          sessionStorage.setItem("useravatar", response.data.profileImgLink);
        })
        .catch((err) => console.log({ err }, BaseUrl + `/myprofile`));
  };

  const handleLogout = () => {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    axios
      .post(BaseUrl + "/logout", {}, { headers })
      .then((response) => {
        sessionStorage.clear();
        handleClose();
        history.push("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleWritePen = () => {
    setPage(`Writing`);
    setWrite(null);
  };

  useEffect(() => {
    getMyProfileInfo();
  }, []);
  const { isImage } = CheckImage(userImg);
  return (
    <Box>
      <NavLink to="/dashboard">
        <IconButton
          className={classes.navIcon}
          onClick={type === "dashboard" && handleWritePen}
        >
          <img src={WriteIcon} alt="" height="30px" width="30px" />
        </IconButton>
      </NavLink>

      <IconButton className={classes.navIcon}>
        <img src={NotifyIcon} alt="" height="30px" width="30px" />
      </IconButton>

      <IconButton className={classes.navIcon} onClick={handleClick}>
        {isImage ? (
          <Avatar src={userImg} alt="User" />
        ) : (
          <Avatar src={placeholderAvatar} alt="Placeholder" />
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        elevation={2}
      >
        <Box align="center">
          <NavLink to="/myprofile">
            <li className={classes.button} onClick={handleClose}>
              {t(`nav_profile`)}
            </li>
          </NavLink>
          <li
            style={{ color: "#FF0000" }}
            className={classes.button}
            onClick={handleLogout}
          >
            {t(`nav_logout`)}
          </li>
        </Box>
      </Popover>
    </Box>
  );
};

const hocNavLoginPreferences = withTranslation()(NavLoginPreference);
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  setPage: setPage,
  setWrite: setWriting,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hocNavLoginPreferences);
