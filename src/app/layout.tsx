'use client'
import React from 'react';
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/Sidebar/Sidebar";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
  currentPage,
}: Readonly<{
  children: React.ReactNode;
  currentPage: string;
}>) {

const pathname = usePathname().startsWith('/signUp') || usePathname().startsWith('/signIn');
console.log(pathname);
  return (
    <html lang="en">
      <body className={`${inter.className}  overflow-x-hidden `} >
        <div className='lg:hidden md:block flex justify-center items-center bg-white h-screen'>
          <p className='text-black font-semibold'>Please open it in desktop only.</p>
        </div>
        <div className='lg:flex hidden h-full overflow-x-hidden '>
        {!pathname && <SideBar/> } 
          {children}
        </div>
        
      </body>
    </html>
  );
}