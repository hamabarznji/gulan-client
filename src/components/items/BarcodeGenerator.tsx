import React from "react";
import {  Grid, Typography } from "@mui/material";
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
  flexDirection: "row", // Change this to "row"
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

const PrintableContent: React.FC<BarcodeGeneratorProps> = ({ id, price }) => (
  <Grid container style={barcodeStyle} display={"flex"} id="printingContent">
    <Grid item>
      <Barcode value={id} width={1} height={50} />
    </Grid>
    <Grid item>
      <Typography color={"black"} style={textStyle}>
        Price: ${price}
      </Typography>
    </Grid>
  </Grid>
);

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ id, price }) => {
  const handleGenerateBarcode = () => {
    console.log(`${id} is submitted to be generated barcode`);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const printableContent =
      document?.getElementById("printingContent")?.innerHTML;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    iframeDoc?.write(`
    <div id="printable-content">
    ${printableContent}
  </div>
    `);

    iframeDoc?.close();
    iframe.contentWindow?.print();
  };

  return (
    <>
      <Modal
        processTitle="Generate"
        modalTitle="Generate Barcode"
        submitHandler={handleGenerateBarcode}
        modalType={true}
        isEdit={false}
      >
        <PrintableContent id={id} price={price} />
      </Modal>
    </>
  );
};

export default BarcodeGenerator;
