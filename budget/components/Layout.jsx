import React from "react";
import {
  RiHome2Line,
  RiPieChart2Line,
  RiBankCard2Fill,
  RiCalendarCheckLine,
  RiBarChart2Line,
} from "react-icons/ri";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen max-w-[400px]">
      <main className="w-full h-full p-5 overflow-y-scroll">{children}</main>
      <div className="flex w-full p-5 pb-2 items-center bg-white justify-between sticky bottom-1">
        <Link href="/" className="p-2">
          <div className="flex flex-col w-12 h-12  text-xs text-center items-center">
            <RiHome2Line size={24} />
            Home
          </div>
        </Link>
        <Link href="/expenses" className="p-2">
          <div className="flex flex-col w-12 h-12 text-xs  text-center items-center">
            <RiPieChart2Line size={24} />
            Expenses
          </div>
        </Link>
        <Link
          href="/scan"
          className="p-2 bg-black text-white text-xs rounded-full -translate-y-4"
        >
          <div className="flex flex-col w-12 h-12  text-center items-center justify-center">
            <RiBankCard2Fill size={24} />
          </div>
        </Link>
        <Link href="/invest" className="p-2">
          <div className="flex flex-col w-12 h-12 text-xs text-center items-center">
            <RiBarChart2Line size={24} />
            Invest
          </div>
        </Link>
        <Link href="/goal" className="p-2">
          <div className="flex flex-col w-12 h-12 text-xs text-center items-center">
            <RiCalendarCheckLine size={24} />
            Goals
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
