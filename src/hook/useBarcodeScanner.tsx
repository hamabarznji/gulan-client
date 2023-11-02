import { useState, useEffect, useCallback } from "react";
import ItemsServiceInstance from "../../services/ItemService";

const useScanner = () => {
  const [scannedValues, setScannedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);

  const handleKeyDown = useCallback(
    async (event: any) => {
      setIsLoading(true);
      try {
        const scannedValue = event.key;

        if (scannedValue !== "Enter") {
          setScannedValues((prevValues) => [...prevValues, scannedValue]);
          return;
        }
        setIsLoading(true);

        const concatedChars = scannedValues.join("");
        const splitChars = concatedChars.split(" ");
        const dateRegex = /\d{4}\/\d{2}\/\d{2}/;
        const dateMatch = dateRegex.exec(concatedChars);

        if (!dateMatch) {
          console.error("Invalid barcode format");
          setScannedValues([]);
          return;
        }

        const lastElementIsTheID = splitChars[splitChars.length - 1];

        setScannedValues([]);
        const res = await ItemsServiceInstance.getItemById(lastElementIsTheID);
        setScannedItem(res);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    },
    [scannedValues]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { scannedItem, isLoading };
};

export default useScanner;
