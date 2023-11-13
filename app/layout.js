import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import "./globals.css";
import Login from "@/components/Login";
//import Link from 'next/link';

export const metadata = {
  title: "Next-DMS",
  description: "Next Data Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <Login />

        <Main>{children}</Main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
