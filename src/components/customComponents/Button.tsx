import React from 'react';
import { Button, ButtonProps, Typography } from '@mui/material';
import COLORS from '../../../public/COLORS';
import { Icon } from '@mui/material';

const styles = {
  backgroundColor: COLORS.primary,
  color: '#fff',
  '&:hover': {
    opacity: 0.8,
  },
  display: 'flex',
  alignItems: 'center',
};

interface CustomButtonProps extends ButtonProps {
  title?: string;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { title, icon, ...rest } = props;

  return (
    <Button {...rest} style={styles} startIcon={icon ? <Icon>{icon}</Icon> : null}>
     {title&& <Typography>{title}</Typography>}
    </Button>
  );
};

export default CustomButton;
