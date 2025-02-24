"use client";


import Navbar from "./Navbar/page"; 
import { usePathname } from "next/navigation";



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noHeaderRoutes = ["/", "/login", "/signup"];

  return (
    <html lang="en">
      <body >

        {!noHeaderRoutes.includes(pathname) && <Navbar />}
        {children}
      </body>
    </html>
  );
}
