import React from "react";
import Modal from "./Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import generateSchema from "./SchemaGenerator";
import TextField from "./TextField";
import  inputFields  from "../../interfaces/inputFields";
interface InputFieldsWithValidationProps {
  processTitle: string;
  modalTitle: string;
  submitHandler: (data: any) => void;
  modalType?: boolean;
  children?: React.ReactNode;
  //inputFields?: InputField[];
  yupSchema?:
    | yup.StringSchema
    | yup.NumberSchema
    | yup.BooleanSchema
    | yup.ArraySchema<any, any>
    | yup.ObjectSchema<any, any>
    | yup.MixedSchema<any>
    | yup.DateSchema;
}




const InputFieldsWithValidation: React.FC<InputFieldsWithValidationProps> = ({
  modalTitle,
  submitHandler,
  processTitle,
}) => {
  const yupSchema = generateSchema(inputFields);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  return (
    <Modal
      processTitle={processTitle}
      modalTitle={modalTitle}
      submitHandler={handleSubmit(onSubmit)}
    >
      {inputFields.map((field) => (
        <Grid
          key={field.id}
          container
          spacing={2}
          sx={{
            marginTop: "0.1rem",
          }}
        >
          <Grid item xs={12}>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              render={({ field: inputField }) => (
                <TextField
                  {...inputField}
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message?.toString()}
                />
              )}
            />
          </Grid>
        </Grid>
      ))}
    </Modal>
  );
};

export default InputFieldsWithValidation;
