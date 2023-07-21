import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomTextField: React.FC<TextFieldProps & { isDate: boolean }> = ({ isDate, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
        <DatePicker
          label="Select date"
          value={null}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="MM/DD/YYYY"
        />
    
    </LocalizationProvider>
  );
};

export default CustomTextField;
