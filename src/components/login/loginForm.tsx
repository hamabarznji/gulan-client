import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import LoginBtn from "./loginBtn";
import LoginInputs from "./inputs";
import UserServiceInstance from "../../../services/UserService";
import { useSnackbar } from "notistack";
import useUserContext from "../../context/useUserContext";
const FormContainer = styled("form")({
  position: "relative",

  top: "50%",
  transform: "translateY(-50%)",
});
export default function LoginForm() {
  const { fetchUserData } = useUserContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [username, serUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    serUsername(e.target.value);
  };
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const user = await UserServiceInstance.login(username, password);
      const { status } = user;
      const isUser = status === 200;
      if (isUser) {
        await fetchUserData();
        enqueueSnackbar("Login success", { variant: "success" });
        router.push("/dashboard");
      } else {
        throw new Error("Login failed. Invalid Credentials!");
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <FormContainer
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid>
          <Card
            sx={{
              maxWidth: 600,
              minWidth: 600,
              maxHeight: 400,
              minHeight: 370,
              backgroundColor: "transparent",
            }}
          >
            <CardContent>
              <Typography variant="h4" color="#3e4465" gutterBottom>
                Welcome to RM System
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Please login to continue
              </Typography>
            </CardContent>
            <CardContent>
              <LoginInputs
                email={username}
                password={password}
                onChangeEmail={onUsernameChange}
                onChangePassword={onPasswordChange}
              />
            </CardContent>
            <Grid sx={{ width: "100%" }}>
              <LoginBtn />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
