import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { withSessionSsr } from "../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Barcode from "react-barcode";
import useBarcodeScanner from "../src/hook/useBarcodeScanner";
type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const HomePage = ({ toggleTheme, user }: HomePageProps) => {
  const id=useBarcodeScanner()

  

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
