import React from "react";
import Modal from "./Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import generateSchema from "../../utils/SchemaGenerator";
import TextField from "./TextField";
import DropDownMenu from "../customComponents/DropDownMenu";

interface InputFieldsWithValidationProps {
  processTitle: string;
  modalTitle: string;
  submitHandler: (data: any) => void;
  modalType?: boolean;
  children?: React.ReactNode;
  inputFields: any[];
}

const InputFieldsWithValidation: React.FC<InputFieldsWithValidationProps> = ({
  modalTitle,
  submitHandler,
  processTitle,
  inputFields,
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
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: field.label,
                  error: !!errors[field.name],
                  helperText: errors[field.name]?.message?.toString(),
                  ref: null,
                };

                return field.isMenu ? (
                  <DropDownMenu {...CommonProps} options={field?.options} />
                ) : (
                  <TextField {...CommonProps} fullWidth />
                );
              }}
            />
          </Grid>
        </Grid>
      ))}
    </Modal>
  );
};

export default InputFieldsWithValidation;
