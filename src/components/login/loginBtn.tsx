import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";




const LoginBtn: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Button
        variant="contained"
        size="large"
        fullWidth
        style={{
          backgroundColor: "#2941bc",
          color: "#fff",
          width: "100%",
        }}
        type="submit"
      >
        Login
      </Button>
    </Grid>
  );
};

export default LoginBtn;
