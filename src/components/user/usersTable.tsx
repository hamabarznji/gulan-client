import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import UserServiceInstance from "../../../services/user";
import UsersTable from "../customComponents/Table";
import Modal from "../customComponents/Modal";
import * as yup from "yup";
import TextField from "../customComponents/TextField";
import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import COLORS from "../../../public/COLORS";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import UpdateUser from "./UpdateUser";
const queryKey: QueryKey = ["users"];

export default function CustomizedTables() {
  const schema = yup.object().shape({
    username: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUsers = async () => {
    try {
      const response = await UserServiceInstance.getUsers();
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  const submitHandler = async (data: any) => {
    console.log("submitting", data);
  };
  const { data } = useQuery(queryKey, fetchUsers);

  const transformedRows = data?.map((user: any, index: number) => ({
    id: index + 1,
    longId: user.id,
    name: user.name,
    role: user.role,
    actions: (
     <UpdateUser user={user}
     
     
     
     />  ),
  }));

  return (
    <UsersTable
      isPagination={false}
      rows={transformedRows || []}
      columns={columns}
    />
  );
}


const Inputs = ({user,control,register}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Controller
            name="username"
            control={control}
            defaultValue={user.name}
            register={register}
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Username"
                fullWidth
                value={value}
                onChange={onChange}
                variant="standard"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />      </Grid>
      <Grid item xs={12}>
           </Grid>
      {/* <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="role-label" sx={inputStyles}>
            Role
          </InputLabel>
          <Select labelId="role-label" label="Role" sx={inputStyles}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
    </Grid>
  );
};

const columns = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "role", label: "Role", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];
