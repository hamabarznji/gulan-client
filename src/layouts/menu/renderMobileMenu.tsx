import React from "react";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from '@mui/icons-material/Logout';
import UserServiceInstance from "../../../services/user";
import Cookies from 'js-cookie';
import { enqueueSnackbar } from "notistack";
import { AxiosResponse } from "axios";
import { Router, useRouter } from "next/router";

const mobileMenuId:string = "primary-search-account-menu-mobile";

interface RenderMobileMenuProps {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: () => React.MouseEvent<HTMLElement>;
}

const RenderMobileMenu: React.FC<RenderMobileMenuProps> = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
}) => {
  const router=useRouter()
  const handleLogut = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const res = await UserServiceInstance.logout();
      Cookies.remove('token')
   
      enqueueSnackbar("Logout success", { variant: "success" });
      if (res as AxiosResponse) {
        await router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem           onClick={handleLogut}
>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge  >
            <LogoutIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>

    </Menu>



  );
};

export default RenderMobileMenu;
