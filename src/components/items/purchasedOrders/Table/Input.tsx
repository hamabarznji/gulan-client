import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import TextField from "../../../customComponents/TextField";

interface InputFieldsWithValidationProps {
  field: any;
  control: any;
  defaultValue?: any;
  disabled?: boolean;
  hidden?: boolean;
  errors: any;
}

const Inputs: React.FC<InputFieldsWithValidationProps> = ({
  field,
  control,
  defaultValue="",
  disabled,
  hidden=false,
  errors,
}) => {
 

  return (
    <Grid item xs={12} key={field.name}>
      <Controller
        name={field.name}
        control={control}
        render={({ field: inputField }) => {
          let CommonProps = {
            ...inputField,
            label: field.label,
            error: !!errors[field.name],
            helperText: errors[field.name]?.message?.toString(),
            ref: null,
            defaultValue: !field.isSensitive ? inputField.value : "",
          };

          return (
            <TextField
              {...CommonProps}
              type={field.type}
              fullWidth
              defaultValue={defaultValue }
              disabled={disabled}
              hidden={hidden}
            />
          );
        }}
      />
    </Grid>
  );
};

export default Inputs;
