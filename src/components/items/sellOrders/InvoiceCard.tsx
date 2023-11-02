import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',  }}
  >
    •
  </Box>
);

const card = (
    <CardContent >
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>

);

export default function OutlinedCard() {
  const theme = useTheme();
  return (
    <Box sx={{ minWidth: 300 ,margin: theme.spacing(1)}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
