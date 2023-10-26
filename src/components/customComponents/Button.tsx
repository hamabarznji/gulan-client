import React from "react";
import { Button, ButtonProps, Typography, Icon } from "@mui/material";
import COLORS from "../../../public/COLORS";

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  isEdit=false,
  type="button",

  ...rest
}) => {
  const styles = {
    backgroundColor:isEdit?"#934eb0": COLORS.primary,
    color: "#fff",
    "&:hover": {
      opacity: 0.8,
    },
    display: "flex",
    alignItems: "center",
    ...rest.style,
  };

  const iconStyles = {
    fontSize: "large",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Button {...rest} style={styles} type={type}>
      {icon && <Icon style={iconStyles}>{icon}</Icon>}
      <Typography>{title}</Typography>
    </Button>
  );
};

interface CustomButtonProps extends ButtonProps {
  title?: string;
  icon?: React.ReactNode;
  isEdit?: boolean;
}

export default CustomButton;
