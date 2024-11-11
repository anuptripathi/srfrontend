import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "./common/components/Header";
import Providers from "./providers";
import authenticated from "./auth/actions/authenticated";
import logout from "./auth/logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SiteRel",
  description: "Gaurateed Site Reialbility",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <Header logout={logout} />
            <Container
              maxWidth={false}
              sx={{ width: "100%" }}
              className={isAuthenticated ? "mt-20 mb-20" : ""}
            >
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
