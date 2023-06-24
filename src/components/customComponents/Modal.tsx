import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "./Button";
import AddIcon from "@mui/icons-material/Add";
import COLORS from "../../../public/COLORS";
import EditIcon from "@mui/icons-material/Edit";


interface Props {
  title?: string;
  processTitle: string;
  modalTitle: string;
  submitHandler?: () => void;
  modalType?: boolean;
}
export default function FormDialog({
  title,
  processTitle,
  modalTitle,
  submitHandler,
  modalType = true,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CustomButton
        icon={modalType ? <AddIcon /> : <EditIcon />}
        variant="contained"
        title={title}
        onClick={handleClickOpen}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={COLORS.primary}>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} title="Cancel" />
          <CustomButton onClick={submitHandler} title={processTitle} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
