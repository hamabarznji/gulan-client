import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { withSessionSsr } from "../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Barcode from "react-barcode";

type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const HomePage = ({ toggleTheme, user }: HomePageProps) => {
  const [scannedValues, setScannedValues] = useState<string[]>([]);
  const [id, setId] = useState<string>("");

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

  return (
    <div>
      <h1>Barcode Generator</h1>
      {id}
    </div>
  );
};

export default HomePage;

export const getServerSideProps = withSessionSsr(
  async ({
    req,
    res,
  }: {
    req: NextApiRequest & { session: { user?: string } };
    res: NextApiResponse;
  }) => {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }
    return {
      props: { user },
    };
  }
);
