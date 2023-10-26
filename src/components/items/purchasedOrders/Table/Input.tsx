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
  LabelName:string,
  inputType:string,
  schema:any,
  scannedItem:any,
  newRows:any
  
}

const Inputs: React.FC<InputFieldsWithValidationProps> = ({
  field,
  control,
  defaultValue="",
  disabled,
  hidden=false,
  errors,
  LabelName,
  inputType,
  schema,
  scannedItem,
  newRows
}) => {
 

  return (
    <Grid item xs={12} key={scannedItem[0]?.itemId}>
            <Controller
              defaultValue={scannedItem[0]?.itemName}
              name={`rows[${newRows.length + 1}].input1`}
              control={control}
              rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: LabelName,
                  //  error: !!errors[field.name],
                  //  helperText: errors[field.name]?.message?.toString(),
                };

                return (
                  <TextField
                    {...CommonProps}
                    type={inputType}
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
