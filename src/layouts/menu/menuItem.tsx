import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import useUserContext from "../../context/useUserContext";
import { useRouter } from "next/router";
import COLORS from "../../../public/COLORS";
import menuItems from "../../interfaces/menuItems";

interface ListComponentProps {
  open: boolean;
}

const activePath = (current: string, path: string) =>
  current === path ? COLORS.primary : COLORS.gray;

const ListComponent: React.FC<ListComponentProps> = ({
  open,
}: ListComponentProps) => {
  const { user } = useUserContext();
  const userRole = user?.role;
  const router = useRouter();
  const currentPath = router.pathname;

  // State to handle the Collapse for nested links
  const [nestedOpen, setNestedOpen] = React.useState<Record<string, boolean>>(
    {}
  );

  const handleNestedClick = (path: string) => {
    setNestedOpen((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {menuItems.map(
        ({ path, roles, title, icon, nestedLinks, nestedLinksItems }) =>
          roles.includes(userRole as string) ? (
            <React.Fragment key={path}>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  color: activePath(currentPath, path),
                  "&:hover": {
                    color: COLORS.primary,
                  },
                }}
                onClick={() => {
                  handleNestedClick(path);

                  router.push(path);
                }}
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
                      color: activePath(currentPath, path),
                    }}
                  >
                    {icon && React.createElement(icon)} {/* Corrected here */}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {open &&
                    nestedLinks &&
                    (nestedOpen[path] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {nestedLinks && (
                <Collapse
                  in={nestedOpen[path] && open}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {nestedLinksItems?.map(
                      ({
                        path: nestedPath,
                        title: nestedTitle,
                        icon: nestedIcon,
                      }) => (
                        <ListItem
                          key={nestedPath}
                          disablePadding
                          sx={{
                            color: activePath(currentPath, nestedPath),
                            "&:hover": {
                              color: COLORS.primary,
                            },
                          }}
                          onClick={() => router.push(nestedPath)}
                        >
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                              onHover: {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                              pl: 4,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                                color: activePath(currentPath, nestedPath),
                              }}
                            >
                              {nestedIcon && React.createElement(nestedIcon)}{" "}
                            </ListItemIcon>
                            <ListItemText
                              primary={nestedTitle}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    )}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ) : null
      )}
    </List>
  );
};

export default ListComponent;
