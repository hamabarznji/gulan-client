import { createTheme } from '@mui/material/styles';

// Define the colors for light mode
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
      contrastText: 'black',
      light: '#007bff',
      dark: '#007bff',
    },
    text: {
      primary: '#007bff', // Set text color to black
    },
  },
});

// Define the colors for dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bff',
    },
  },
});

export { lightTheme, darkTheme };
