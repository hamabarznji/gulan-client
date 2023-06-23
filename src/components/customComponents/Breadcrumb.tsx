import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import menuItems from "../../layouts/menuItems";
import { useRouter } from 'next/router';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
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
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
        {pathsArray.map((item, index) => {
          const isActive = router.asPath === `/${item}`;
          const icon = getIconForPath(item);

          return (
            <Link
              key={item}
              underline={isActive ? "none" : "hover"}
              sx={{ display: 'flex', alignItems: 'center' }}
              color={isActive ? 'text.primary' : 'inherit'}
              href={item}
              onClick={() => onClickHandler(item)}
            >
              {icon && (
                <Typography variant="h5" component="span" sx={{ mr: 0.5 }}>
                  {icon}
                </Typography>
              )}

              <Typography variant="h5" component="span">
                {item}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
