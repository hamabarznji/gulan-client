import Head from "next/head";
import { useRouter } from "next/router";
import PersistentDrawerLeft from "./drawer";

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
  const router = useRouter();
  const title =
    router?.asPath == "/"
      ? "Home"
      : router?.asPath?.split("/")[1].charAt(0).toUpperCase() +
        router?.asPath?.split("/")[1].slice(1);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <main>
        {router.pathname === "/login" ? (
          children
        ) : (
          <PersistentDrawerLeft toggleTheme={toggleTheme} themeMode={themeMode}>
            {children}
          </PersistentDrawerLeft>
        )}
      </main>
    </>
  );
};

export default Layout;