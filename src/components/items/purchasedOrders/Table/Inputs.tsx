import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TableCell, Grid, Button } from "@mui/material";
import generateSchema from "../../../../utils/SchemaGenerator";
import TextField from "../../../customComponents/TextField";
import inputFields from "../../../../interfaces/item/AddPurchaseItem";
import DropDownMenu from "../../../customComponents/DropDownMenu";
import Butoon from "../../../customComponents/Button";
import ItemsServiceInstance from "../../../../../services/ItemService";
import { useQuery, QueryKey } from "@tanstack/react-query";


interface InputFieldsWithValidationProps {
  submitHandler?: (data: any) => void;
  modalType?: boolean;
  children?: React.ReactNode;
  onAddItem?: (data:any) => void;
}

// ... (other imports)

const Inputs: React.FC<InputFieldsWithValidationProps> = ({
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
    console.log({data})
    onAddItem(data);
    reset({
      id: "",
      qty: "",
      price: "",
    }); 
  };
  const fetchItems = async () => {
    try {
      const response = await ItemsServiceInstance.getItemsForPurchaseInvoice();
      return response
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const { data, refetch } = useQuery(["getItems"], fetchItems);
  const updatedInputs = inputFields.map((input) => {
    if (input.name === "id") {
      input.options = data || [];
    }
    return input;
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction={"row"}>
        {updatedInputs?.map((field, index) => (
          <Grid item xs={3} key={field.name}>
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
                  <DropDownMenu
                    options={field?.options || []}
                    {...CommonProps}  
                    isValueAndName={true}
                 
                 
                  />
                ) : (
                  <TextField {...CommonProps} type={field.type} isDate={false} />
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


