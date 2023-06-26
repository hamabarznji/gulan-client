import React from "react";
import Modal from "../customComponents/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import TextField from "../customComponents/TextField";
import SelectCustome from "../customComponents/DropDownMenu";
import UserServiceInstance from "../../../services/user";
import { useSnackbar } from "notistack";
const UpdateUser: React.FC = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string(),
    role: yup.string().oneOf(["admin", "user"]),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      const newUser: any = await UserServiceInstance.updateUser({
        id: user.id,
        ...data,
      });

      if (newUser.status === 200) {
        reset();
        enqueueSnackbar("New User Updated Successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  });
  return (
    <>
      <Modal
        processTitle="Update User"
        modalTitle="Update User"
        submitHandler={submitHandler}
        modalType={false}
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
              defaultValue={user.name}
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
              defaultValue={user.username}
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
                    defaultValue={user.role}
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

export default UpdateUser;
