import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TableCell, Grid, Button } from "@mui/material";
import generateSchema from "../../../../utils/SchemaGenerator";
import TextField from "../../../customComponents/TextField";
import inputFields from "../../../../interfaces/item/AddPurchaseItem";
import DropDownMenu from "../../../customComponents/DropDownMenu";
import Butoon from "../../../customComponents/Button";
interface InputField {
  id: string;
  name: string;
  label: string;
  isSensitive: boolean;
  isMenu: boolean;
  options?: any[];
  type: string;
}

interface InputFieldsWithValidationProps {
  submitHandler?: (data: any) => void;
  modalType?: boolean;
  children?: React.ReactNode;
  updateData?: any;
  onAddItem?: (data:any) => void;
}

const Inputs: React.FC<InputFieldsWithValidationProps> = ({
  submitHandler,
  updateData,
  onAddItem,
}) => {
  const yupSchema = generateSchema(inputFields);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = (data: any) => {
    onAddItem(data);
    reset({
      item_id: "",
      qty: "",
      price: "",
    }); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction={"row"}>
        {inputFields.map((field, index) => (
          <Grid item xs={3} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: inputField }) => {
                let inputProps = {
                  ...inputField,
                  label: field.label,
                  error: !!errors[field.name],
                  helperText: errors[field.name]?.message?.toString(),
                  ref: null,
                  defaultValue: !field.isSensitive ? inputField.value : "",
                };

                return field.isMenu ? (
                  <DropDownMenu {...inputProps} options={[]} />
                ) : (
                  <TextField {...inputProps} type={field.type} isDate={false} />
                );
              }}
            />
          </Grid>
        ))}
        <Grid item xs={3}>
          <Butoon title="Add" type="submit">
            Add
          </Butoon>
        </Grid>
      </Grid>
    </form>
  );
};

export default Inputs;


