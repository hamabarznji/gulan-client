import * as React from "react";
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
  submitHandler?: () => any;
  modalType?: boolean;
  children?: React.ReactNode;
}
export default function FormDialog({
  children,
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
    <form
      onSubmit={submitHandler}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <CustomButton
        icon={modalType ? <AddIcon /> : <EditIcon />}
        variant="contained"
        title={title}
        onClick={handleClickOpen}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={COLORS.primary}>{modalTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} title="Cancel" />
          <CustomButton
            type="submit"
            title={processTitle}
            onClick={submitHandler}
          />
        </DialogActions>
      </Dialog>
    </form>
  );
}
