import { NextApiRequest, NextApiResponse } from "next";
import { withSessionSsr } from "../../utils/withSession";
import menuItems from "../interfaces/menuItems";


interface User {
  role?: string;
}

interface MenuItem {
  path: string;
  roles: string[];
}

 const isCurrentUserAllowed = withSessionSsr(
  async ({
    req,
    res,
  }: {
    req: NextApiRequest & { session: { user?: string } };
    res: NextApiResponse;
  }) => {
    const user = req?.session?.user || null;
    const currentPath = req?.url ?? "";

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }

    const allowedRoles = menuItems
      .filter(item => item.path === currentPath)
      .map(item => item.roles)
      .flat();
      /* @ts-ignore */
    if (user?.role as string !== "admin" && !allowedRoles.includes(user?.role as string)) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: true,
        },
      };
    }

    return {
      props: {
        pageTitle: "Login",
        user,
        currentPath,
      },
    };
  }
);


export default isCurrentUserAllowed;