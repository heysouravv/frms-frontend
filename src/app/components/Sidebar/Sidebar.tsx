"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { title } from "process";

interface SideBarProps {
  className?: string;
}

const SideBar: FC<SideBarProps> = ({ className }) => {
  const [open, setOpen] = useState(true);
  const [subMenu, setsubMenu] = useState(false);
  const router = useRouter();
const pathname = usePathname();

const About =[
    {
        title:"What's New",
        img:"/assets/Icons/whatsNew.svg",
        path:"/"
    },
    {
        title:"Feedback",
        img:"/assets/Icons/Feedback.svg",
        path:"/"
    }
]

const support = [
  {
    title:"Support",
    img:"/assets/Icons/support.svg",
    path:"/"
  },
  {
    title:"Settings",
    img:"/assets/Icons/settings.svg",
    path:"/"
  },
  {
    title:"Logout",
    img:"/assets/Icons/logout.svg",
    path:"/"
  }
]

  const Menus =  [
        { title: "Dashboard", selectedImage:"",img: "/assets/Icons/dashboard.svg",arrow:false, path: "/" },
        {
          title: "Team",
          img: "/assets/Icons/Team.svg",
          selectedImage:"",
          arrow:true,
          path: "/jobs",
          subMenu: true,
          subMenuItems: [
            { title: "Members" },
            { title: "Leads" },
            { title: "Staff Members" },
            { title: "Migration Assistance" },
          ],
        },
        {
          title: "Finance",
          img: "/assets/Icons/Finance.svg",
          selectedImage:"",
          arrow:true,
          path: "/mastervideos",
        },
        {
          title: "Inventory",
          img: "/assets/Icons/InventoryGray.svg",
          arrow:true,
          selectedImage:"/assets/Icons/OrangeIneventory.svg",
          path: "/Inventory",
        },

      ];

  return (
    <div
      className={`${
        open ? "w-96" : "w-24"
      } duration-500 ${className} hidden lg:flex flex-col h-screen bg-white  border-[#D0D5DD]  border-r  `}
    >
      <div className="flex justify-start w-full items-start px-6 pt-8">
        {open ? (
          <div className="flex flex-col gap-y-5 w-full justify-start">
            <p className="text-black font-semibold lg:text-xl">Custom ERP</p>

            <div className="flex bg-[#F8F8F8] border-2 border-[#D0D5DD] rounded-md px-3 py-4 justify-between w-full items-center">
            
              <div className="flex gap-x-2 justify-start items-center">
                <img src="./assets/Icons/Aciahea.svg" className="w-6 h-6" />
                <p className="text-black font-semibold lg:text-lg">
                  Achaia Studio
                </p>
              </div>

              <div className="">
                <p className="rounded-md text-black bg-[#0000000D] py-1 ml-4 px-2 text-sm  font-medium">Basic</p>
              </div>
              <div>

              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-4xl font-bold mt-9">G</h1>
        )}
      </div>


      <div className="flex flex-col w-full justify-between h-full items-start">
        <div className="w-full">
          <ul className="lg:flex hidden flex-col mx-4 py-4 gap-y-0">
            {Menus.map((menu, id) => {
              return (
                <React.Fragment key={id}>
                  <li
                    className={`text-[#344054] submenu-trigger justify-between w-full flex items-center gap-x-4 cursor-pointer font-medium p-2 hover:text-white hover:bg-[#FFF1EB] rounded-md ${pathname === "/Inventory" && menu.title === "Inventory"  ? "bg-[#FFF1EB] text-white" : ""}`}
                    key={id}
                  >
                    <div className="flex items-center gap-x-4">
                    <span className="text-2xl block float-left submenu-trigger hover:text-white">
                      <Image src={`${menu.title === "Inventory" ? menu.selectedImage : menu.img}`} width={20} height={20} alt={menu.img}  />
                    </span>

                    <Link href={menu.path}>
                      <span className={`${!open && "hidden"} font-semibold ${menu.title === "Inventory"  ?"text-[#FE4F00]" :"text-[#344054]"}`}> {menu.title}</span>
                    </Link>
                    </div>
                    {menu.arrow && (
                      <img src="/assets/Icons/rightArrowGray.svg" className="" />
                    )}
                   
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
          <hr className="border border-[#EAECF0] " />
          <ul className="lg:flex hidden flex-col mx-4 py-4 gap-y-2">
            <p className="font-semibold">About ERP</p>
            {About.map((menu, id) => {
              return (
                <React.Fragment key={id}>
                  <li
                    className={`text-[#344054] flex items-center gap-x-4 cursor-pointer font-medium p-2 hover:text-white hover:bg-[#FF7645] rounded-md `}
                    key={id}
                  >
                    <span className="text-2xl block float-left hover:text-white">
                      <Image src={menu.img} width={20} height={20} alt={menu.img} />
                    </span>

                    <Link href={menu.path}>
                      <span className={`${!open && "hidden"} font-semibold`}> {menu.title}</span>
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        <div className="w-full border-t border-[#EAECF0]">
          <ul className="lg:flex hidden flex-col mx-4 py-4 gap-y-2">
            {support.map((menu, id) => {
              return (
                <React.Fragment key={id}>
                  <li
                    className={`text-[#344054] flex items-center gap-x-4 cursor-pointer font-medium p-2 hover:text-white hover:bg-[#FF7645] rounded-md `}
                    key={id}
                  >
                    <span className="text-2xl block float-left hover:text-white">
                      <Image src={menu.img} width={20} height={20} alt={menu.img} />
                    </span>

                    <Link href={menu.path}>
                      <span className={`${!open && "hidden"} font-semibold`}> {menu.title}</span>
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
