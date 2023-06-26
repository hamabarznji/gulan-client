import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { UserContext } from "../../context/UserContext";

import { useRouter } from "next/router";
import COLORS from "../../../public/COLORS";
import menuItems from "../menuItems";

interface ListComponentProps {
  open: boolean;
}

const activePath = (current: string, path: string) =>
  current == path ? COLORS.primary : COLORS.gray;

const ListComponent: React.FC<ListComponentProps> = ({ open }: ListComponentProps) => {
  const { user } = useContext(UserContext);
  const userRole = user?.role;
console.log(userRole)
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <List>
      {menuItems.map((item) =>
        item.roles.includes(userRole) ? (
          <ListItem
            key={item?.path}
            disablePadding
            sx={{
              display: "block",
              color: activePath(currentPath, item?.path),
              "&:hover": {
                color: COLORS.primary,
              },
            }}
            onClick={() => router.push(item?.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                onHover: {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: activePath(currentPath, item?.path),
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ) : null
      )}
    </List>
  );
};

export default ListComponent;
