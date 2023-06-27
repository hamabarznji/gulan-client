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
  updateData?: any;
}

const InputFieldsWithValidation: React.FC<InputFieldsWithValidationProps> = ({
  modalTitle,
  submitHandler,
  processTitle,
  inputFields,
  modalType = true,
  updateData,
}) => {
  const yupSchema = generateSchema(inputFields);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: updateData,
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
      modalType={modalType}
      isEdit={updateData ? true : false}
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
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: field.label,
                  error: !!errors[field.name],
                  helperText: errors[field.name]?.message?.toString(),
                  ref: null,
                  defaultValue: !field.isSensitive ? inputField.value : "",
                };

                return field.isMenu ? (
                  <DropDownMenu {...CommonProps} options={field?.options} />
                ) : (
                  <TextField
                    {...CommonProps}
                    type={field.type}
                    isDate={field.type == "date" ? true : false}
                  />
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
