"use client";


import Navbar1 from "./Navbar/Navbar1"; 
import  Navbar2  from "./Navbar/Navbar2"; 
import { usePathname } from "next/navigation";
import style from "../styles/global.module.css"



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const dashboardRoute = ["/", "/login", "/signup"].includes(pathname);

  return (
    <html lang="en">
      <body className={style.body}>

        { dashboardRoute ? <Navbar2 /> : <Navbar1 />}
        {children}
      </body>
    </html>
  );
}
