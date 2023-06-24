import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonProps } from "@mui/material";
import COLORS from "../../../public/COLORS";

const EditButton: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Button {...rest} variant="contained" style={{
      backgroundColor: COLORS.primary,
    }}>
      <EditIcon
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      />
    </Button>
  );
};

export default EditButton;
