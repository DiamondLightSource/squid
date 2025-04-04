import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import B18Nav from "./components/Nav";
import { AppBar, Typography } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GDA scan definition app",
  description: "for use at b18 at initially",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar position="static" sx={{ flexDirection: "row" }}>
          <Link href="/">
            <Typography variant="h4">GDA Scan Definition</Typography>
          </Link>
          <B18Nav />
        </AppBar>
        {children}
      </body>
    </html>
  );
}
