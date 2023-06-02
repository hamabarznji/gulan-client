import React from "react";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from "next/router";

const menuItems: { title: string; icon: React.FC; path: string }[] = [
  { title: "Dashboard", icon: DashboardIcon, path: "/" },
  { title: "Profile", icon: PersonIcon, path: "/profile" },

];

interface ListComponentProps {
  open: boolean;
}

const ListComponent: React.FC<ListComponentProps> = ({ open }: ListComponentProps) => {
  const router = useRouter();
  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}
        
          onClick={()=>router.push(item.path)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
