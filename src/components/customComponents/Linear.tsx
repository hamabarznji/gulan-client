
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import COLORS from '../../../public/COLORS';



export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%'}}>
      <LinearProgress sx={{
        height: '7px', // Increase the height here
        backgroundColor: "#4FA3D1", // Change background color
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#5fb391', // Change the progress bar color
        }
      }} />
    </Box>
  );
}
