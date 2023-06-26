import Head from "next/head";
import { useRouter } from "next/router";
import PersistentDrawerLeft from "./drawer";
import Breadcrumb from "../components/customComponents/Breadcrumb";
import useUserContext from "../context/useUserContext";
interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  themeMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  toggleTheme,
  themeMode,
}) => {
  const currentPath = useRouter().pathname;
  const userRole = useUserContext().user?.role
  const router = useRouter();
  const title =
    router.asPath === "/"
      ? "Home"
      : currentPath.split("/")[1].charAt(0).toUpperCase() +
        currentPath.split("/")[1].slice(1);

  
        return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <main style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
        {router.pathname === "/login" ? (
          children
        ) : (
          <PersistentDrawerLeft toggleTheme={toggleTheme} themeMode={themeMode}>
            <Breadcrumb />
            {children}
          </PersistentDrawerLeft>
        )}
      </main>
    </>
  );
};

export default Layout;
