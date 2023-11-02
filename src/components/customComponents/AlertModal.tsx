import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "./Button";
import AddIcon from "@mui/icons-material/Add";
import COLORS from "../../../public/COLORS";
import { Button } from "@mui/material";

export default function AlertModal({
  children,
  title,
  processTitle,
  modalTitle,
  submitHandler,
  isEdit = false,
  customeStyles,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton
        icon={<AddIcon />}
        variant="contained"
        title={title}
        onClick={handleClickOpen}
        isEdit={isEdit}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={COLORS.primary} sx={styles.dialogTitle}>
          {modalTitle}
        </DialogTitle>
        <DialogContent sx={[styles.contentStyle, customeStyles?.contentStyle]}>
          {children}
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleClose}
            title="Cancel"
            style={{
              backgroundColor: "#D1D0CE",
              color: "#000",
            }}
          />

          <Button
            style={{
              backgroundColor: "#934eb0",
            }}
            type="submit"
            title={processTitle}
            onClick={() => {
              handleClose();
              submitHandler!();
            }}
            
          >ADD</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const styles = {
  dialogTitle: {
    backgroundColor: "#E8E8E8",
    textAlign: "center",
    color: "#495057",
    fontWeight: "bold",
  },
  contentStyle: {
    minWidth: "200px",
    minHeight: "100px",
    marginTop: "1rem",
  },
};
interface Props {
  title?: string;
  processTitle: string;
  modalTitle: string;
  submitHandler?: () => any;
  children?: React.ReactNode;
  isEdit?: boolean;
  customeStyles?: any;
}
