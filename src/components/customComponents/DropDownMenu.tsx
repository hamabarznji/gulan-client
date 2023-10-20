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

interface DropDownMenuProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  error?: boolean; 
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void; // Update the onChange prop type
  defaultValue?: string;
  isValueAndName?: boolean;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  label,
  value,
  options,
  error,
  onChange,
  defaultValue,
  isValueAndName=false,
  ...props
}) => {
  const selectedLabel = options.find(option => option.value === value)?.label || '';

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel sx={{ color: COLORS.primary }}>{label}</InputLabel>
      <Select
        {...props}
        value={value}
        onChange={onChange}
        renderValue={() => selectedLabel} // Render the selected label
        defaultValue={defaultValue ? defaultValue : ""}
      >
        {options.map((option, index) => (
       <MenuItem 
       key={option.value} 
       value={isValueAndName ? `${option.value},${option.label}` : option.value} 
       sx={inputStyles}
     >
       {option.label}
     </MenuItem>
     
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownMenu;
