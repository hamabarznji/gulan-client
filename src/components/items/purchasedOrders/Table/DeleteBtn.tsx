import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";



const DeleteButton = ({ onClick }:any) => (
    <Button
    variant="contained"
    color="error"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={onClick}
    
  >
    <DeleteIcon
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  </Button>
  );


  export default DeleteButton