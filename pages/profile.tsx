import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { withSessionSsr } from "../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";

type ToggleThemeFunction = () => void;

interface HomePageProps {
  toggleTheme: ToggleThemeFunction;
  user: string;
}

const HomePage = ({ toggleTheme, user }: HomePageProps) => {
  return (
    <div>
      <h1>Welcome to my profie.js App!</h1>

      <Link href="/">Home</Link>
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
