import TextField, { TextFieldProps } from '@mui/material/TextField';
const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#397568',
      },
      '& input::placeholder': {
        color: '#999999',
      },
      '&:hover fieldset': {
        borderColor: '#397568',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#397568',
      },
      '& input': {
        color: 'black', // Set the desired text color
      },
    },
  };

  const labelStyles = {
    color: '#999999', // Set the desired default label color
    '&.Mui-focused': {
      color: '#397568', // Set the desired label color when focused
    },
    '&.MuiInputLabel-shrink': {
      color: '#397568', // Set the desired label color when the label moves up
    },
  };
const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={inputStyles}
      InputLabelProps={{
        className: 'Mui-focused', // Add Mui-focused class when focused
        style: {
          color: '#397568', // Set the desired label color when focused
        },
      }}  />
  );
};

export default CustomTextField;
