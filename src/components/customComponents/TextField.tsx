import TextField, { TextFieldProps } from '@mui/material/TextField';
import COLORS from '../../../public/COLORS';
const inputStyles = {
    '& .MuiOutlinedInput-root': {
    
      '& input::placeholder': {
        color: '#999999',
      },
      '&:hover fieldset': {
        borderColor:  COLORS.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor:  COLORS.primary,
      },
      '& input': {
        color: 'black', // Set the desired text color
      },
    },
  };

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={inputStyles}
      fullWidth
      InputLabelProps={{
        className: 'Mui-focused', // Add Mui-focused class when focused
        style: {
          color:  COLORS.primary, // Set the desired label color when focused
        },
      }}  />


      
  );
};

export default CustomTextField;
