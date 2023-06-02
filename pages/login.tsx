import React, { FormEvent } from "react";
import { withSessionSsr } from "../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Card from "../src/components/login/loginForm";
import Image from "next/image";
import loginImage from "../public/login.svg";

interface LoginPageProps {
  user: any;
}

export default function LoginPage({ user }: LoginPageProps) {
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid xs={12} sm={6}>
        <Image
          src={loginImage}
          alt="Login"
          style={{ maxWidth: "80%", height: "100%" }}
        />
      </Grid>

      <Grid xs={12} sm={6}>
        <Card />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = withSessionSsr(
  async ({
    req,
    res,
  }: {
    req: NextApiRequest & { session: { user?: string } };
    res: NextApiResponse;
  }) => {
    const user = req?.session?.user || null;
    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }

    return {
      props: { pageTitle: "Login", user },
    };
  }
);
