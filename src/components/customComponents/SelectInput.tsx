import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import COLORS from "../../../public/COLORS";
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "red",
    },
  },
  color: "black",
};

interface CustomSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  error?: boolean; 
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void; // Update the onChange prop type
  defaultValue?: string;
}


const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  error,
  onChange,
  defaultValue,
  ...props
  
}) => {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel sx={{ color: COLORS.primary }}>{label}</InputLabel>
      <Select
        {...props}
        value={value}
        onChange={onChange}
        renderValue={(selected) => selected}
        defaultValue={defaultValue?defaultValue:""}
      >
        {options.map((option,index) => (
          <MenuItem defaultValue={defaultValue} key={option.value} value={option.value} sx={inputStyles} >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
