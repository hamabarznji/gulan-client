import { useState, useEffect } from "react";

const useBarcodeScanner = () => {
  const [id, setId] = useState("");
  const [scannedValues, setScannedValues] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const scannedValue = event.key;

      if (scannedValue !== "Enter") {
        setScannedValues((prevValues) => [...prevValues, scannedValue]);
        return;
      }

      const concatedChars = scannedValues.join("");
      const splitChars = concatedChars.split(" ");
      const dateRegex = /\d{4}\/\d{2}\/\d{2}/;
      const dateMatch = dateRegex.exec(concatedChars);

      if (!dateMatch) {
        console.log("Invalid barcode format");
        setScannedValues([]);
        setId("");
        return;
      }

      const lastElementIsTheID = splitChars[splitChars.length - 1];

      setId(lastElementIsTheID);
      setScannedValues([]);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scannedValues, id]);
  return id;
};

export default useBarcodeScanner;
