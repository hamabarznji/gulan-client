import React from "react";
import { Button, Chip, Grid, Typography } from "@mui/material";
import Modal from "../customComponents/Modal";
import Barcode from "react-barcode";

interface BarcodeGeneratorProps {
  id: string;
  price: number;
}
const barcodeStyle = {
  width: "500px",
  height: "200px",
  margin: "20px",
  backgroundColor: "#f9f9f9",
  border: "2px solid #ccc",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  fontSize: "1.5rem",
  marginTop: "10px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
    
};
const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ id, price }) => {
  const handleGenerateBarcode = () => {
    console.log(`${id} is submitted to be generated barcode`);
  };

  return (
    <Modal
      processTitle="Generate"
      modalTitle="Generate Barcode"
      submitHandler={handleGenerateBarcode}
      modalType={true}
      isEdit={false}
    >
      <Grid container style={barcodeStyle} direction={"column"}>
        <Grid item>
          <Barcode value={id} width={1} height={50} />
        </Grid>
        <Grid item>
          <Typography color={"black"} style={textStyle}>Price: ${price}</Typography>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default BarcodeGenerator;
