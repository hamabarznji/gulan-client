import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "../customComponents/TextField";
interface LoginInputsProps {
  email: string;
  password: string;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInputs: React.FC<LoginInputsProps> = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
  label="User Name"
  variant="outlined"
  fullWidth
  value={email}
  onChange={onChangeEmail}
  id="userEmail"
/>

        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={onChangePassword}
            id='userPassword'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginInputs;
