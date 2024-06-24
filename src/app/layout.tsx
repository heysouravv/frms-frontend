'use client'

import React, { useEffect } from 'react';
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/Sidebar/Sidebar";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  currentPage,
}: Readonly<{
  children: React.ReactNode;
  currentPage: string;
}>) {
  
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
  if (!token){
    router.replace('/signIn')
  }
  else{
    router.replace('/')

  }
  }, [router]);
const pathname =  usePathname().startsWith('/signIn');
console.log(pathname);
  return (
    <html lang="en">
      <body className={`${inter.className}  overflow-x-hidden `} >
        <div className='lg:hidden md:block flex justify-center items-center bg-white h-screen'>
          <p className='text-black font-semibold'>Please open it in desktop only.</p>
        </div>
        <div className='lg:flex hidden h-screen overflow-y-scroll no-scrollbar '>
        {!pathname && <SideBar/> } 
          {children}
        </div>
        
      </body>
    </html>
  );
}