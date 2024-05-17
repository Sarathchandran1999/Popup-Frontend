/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import Logo from "../Assets/Logo.svg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BorderAllIcon from '@mui/icons-material/BorderAll';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTestmonialClick = () => {
    const contactSection = document.getElementById("testmonial");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCreateNowClick = () => {
    const createNowSection = document.getElementById("create-now");
    if (createNowSection) {
      createNowSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAllPopupsClick = () => {
    const createNowSection = document.getElementById("all-popups");
    if (createNowSection) {
      createNowSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAboutClick = () => {
    const createNowSection = document.getElementById("about");
    if (createNowSection) {
      createNowSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon  />,
    },
    {
      text: "About",
      icon: <InfoIcon  onClick={handleAboutClick}/>,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon onClick={handleTestmonialClick}/>,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon onClick={handleContactClick} />,
    },
    {
      text: "All PopUps",
      icon: <BorderAllIcon onClick={handleAllPopupsClick}/>,
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        {/* <img src={Logo} alt="" /> */}
        <h2 style={{color:"#e48f0f"}}>PopMeUp</h2>
      </div>
      <div className="navbar-links-container">
        <a href="">Home</a>
        <a href="#" onClick={handleAboutClick}>About</a>
        <a href="#" onClick={handleTestmonialClick}>Testimonials</a>
        <a href="#" onClick={handleContactClick}>Contact</a>
        <a href="#" onClick={handleAllPopupsClick}>All PopUps</a>
        <button className="primary-button" onClick={handleCreateNowClick}>Create Now!</button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon style={{color:"#fe9e0d"}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
