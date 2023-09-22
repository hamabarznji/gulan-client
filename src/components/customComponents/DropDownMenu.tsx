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
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  label,
  value,
  options,
  error,
  onChange,
  defaultValue,
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
          <MenuItem key={option.value} value={option.value} sx={inputStyles}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownMenu;
