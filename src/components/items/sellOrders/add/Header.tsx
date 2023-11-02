import React from "react";
import { Typography, Grid } from "@mui/material";
import Image from "next/image";
import icon from "../../../../public/icon.png";
import useUserContext from "../../../../context/useUserContext";
interface HeaderProps {
  date: string;
  id: string;
}

const Header: React.FC<HeaderProps> = ({ id, date }) => {
  const user = useUserContext().user?.username

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Image src={icon} alt="Shopping Cart Icon" width={150} height={150} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h3" align="right" gutterBottom color={"black"}>
          INVOICE
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="left" color="black">
          GUL GUL Shoping
        </Typography>
        <Typography variant="h6" align="left" color="black">
          Erbil Gullan Mall
        </Typography>
        <Typography variant="h6" align="left" color="black">
          +964 750 000 0000
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="right" color="black">
          Invoice No: {id}
        </Typography>
        <Typography variant="h6" align="right" color="black">
          Date: {date}
        </Typography>
        <Typography variant="h6" align="right" color="black">
          Issued By: {user}
        </Typography>
      </Grid>

    </>
  );
};

export default Header;
