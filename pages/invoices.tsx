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
  const theme = useTheme();
  return (
    <div>
      <h1>Welcome to my Next.js App!</h1>
     
      <Link href="/profile">profile</Link>

      <p>Current mode: {theme.palette.mode}</p>
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
