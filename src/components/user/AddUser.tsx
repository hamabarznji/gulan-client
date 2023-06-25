import React from "react";
import Modal from "../customComponents/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import TextField from "../customComponents/TextField";
import SelectCustome from "../customComponents/SelectInput";
import UserServiceInstance from "../../../services/user";
import { useSnackbar } from "notistack";
import { AxiosResponse } from "axios";
const AddUser: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(["admin", "user"]).required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      const newUser:any = await UserServiceInstance.addUser(data);
  
      if (newUser.status === 200) {
        reset()
        enqueueSnackbar("New User Added Successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error:any) {
      console.error(error);
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  });
  
  return (
    <>
      <Modal
        processTitle="Add New User"
        modalTitle="Add New User"
        submitHandler={submitHandler}
      >
        <Grid
          container
          spacing={3}
          sx={{
            marginTop: "0.2rem",
          }}
        >
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Username"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Password"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Username is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <SelectCustome
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Role"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                    ]}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default AddUser;
