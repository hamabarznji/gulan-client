import { useState, useEffect } from "react";
import ItemsServiceInstance from "../../services/ItemService";

const useBarcodeScanner = () => {
  const [id, setId] = useState("");
  const [item, setItem] = useState();

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
        // Add more structured error handling here
        console.error("Invalid barcode format");
        setScannedValues([]);
        setId("");
        return;
      }

      const lastElementIsTheID = splitChars[splitChars.length - 1];

      setId(lastElementIsTheID);
      setScannedValues([]);
      ItemsServiceInstance.getItemById(lastElementIsTheID)
        .then((res) => {
          setItem(res);
        })
        .catch((error) => {
          // Add more structured error handling here
          console.error("Error fetching item:", error);
        });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
  return item||null;
};

export default useBarcodeScanner;
