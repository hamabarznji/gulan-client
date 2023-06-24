import React from "react";
import { Button, ButtonProps, Typography, Icon } from "@mui/material";
import COLORS from "../../../public/COLORS";

const CustomButton: React.FC<CustomButtonProps> = ({ title, icon, ...rest }) => {
const styles = {
backgroundColor: COLORS.primary,
color: "#fff",
"&:hover": {
opacity: 0.8,
},
display: "flex",
alignItems: "center",
};

const iconStyles = {
fontSize: "large",
display: "flex",
justifyContent: "center",
alignItems: "center",
};

return (
<Button {...rest} style={styles}>
{icon && <Icon style={iconStyles}>{icon}</Icon>}
<Typography>{title}</Typography>
</Button>
);
};

interface CustomButtonProps extends ButtonProps {
title?: string;
icon?: React.ReactNode;
}

export default CustomButton;