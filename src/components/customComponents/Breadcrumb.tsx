import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import menuItems from "../../interfaces/menuItems";
import { useRouter } from "next/router";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs() {
  const router = useRouter();
  const pathsArray = router.asPath.split("/").filter((item) => item !== "");

  const getIconForPath = (path: string) => {
    switch (path) {
      case "home":
        return <HomeIcon />;
      case "hot":
        return <WhatshotIcon />;
      case "grain":
        return <GrainIcon />;
      default:
        return null;
    }
  };

  const onClickHandler = (path: string) => {
    router.push(`/${path}`);
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
        {pathsArray.map((item, index) => {
          const isLastIndex = index === pathsArray.length - 1;

          const icon = getIconForPath(item);
          return (
            <Link
              key={item}
              underline={index == pathsArray.length - 1 ? "none" : "hover"}
              sx={{ display: "flex", alignItems: "center" }}
              color={index == 0 ? "inherit" : "black"}
              href={item}
              onClick={() => {
                if (!isLastIndex) {
                  onClickHandler(item);
                }
              }}
            >
              {icon && (
                <Typography variant="h5" component="span" sx={{ mr: 0.5 }}>
                  {icon}
                </Typography>
              )}

              <Typography variant="h5" component="span">
                {index == 0 && "/"}
                {item}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
