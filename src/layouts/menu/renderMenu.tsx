import { Menu, MenuItem } from "@mui/material";
import UserServiceInstance from "../../../services/user";
import { enqueueSnackbar } from "notistack";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const menuId: string = "primary-search-account-menu";

interface RenderMenuProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleProfile: () => void;
}

const RenderMenu: React.FC<RenderMenuProps> = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleProfile,
}) => {
  const router = useRouter();
  const handleLogut = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const res = await UserServiceInstance.logout();
      Cookies.remove('token')
      handleMenuClose();
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
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogut}>Logout</MenuItem>
    </Menu>
  );
};

export default RenderMenu;
