import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../styles/theme";
import { useState, useEffect } from "react";
import RootLayout from "../src/layouts/RootLayout";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "../src/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [themeMode, setThemeMode] = useState<true | false>(true);
  const theme = themeMode === true ? lightTheme : darkTheme;
  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === true ? false : true));
    localStorage.setItem("theme", "" + !themeMode);
  };

  useEffect(() => {
    setThemeMode(JSON.parse(localStorage.getItem("theme") || "true"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <UserProvider>
            {" "}
            <RootLayout toggleTheme={toggleTheme} themeMode={themeMode}>
              <Component {...pageProps} />
            </RootLayout>
          </UserProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
