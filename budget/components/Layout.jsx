import React from "react";
import {
  RiHome2Line,
  RiPieChart2Line,
  RiBankCard2Fill,
  RiCalendarCheckLine,
  RiBarChart2Line,
} from "react-icons/ri";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <main className="w-full h-full p-5">{children}</main>
      <div className="flex w-full p-5 pb-2 items-center justify-between sticky bottom-0">
        <div className="p-2">
          <div className="flex flex-col w-12 h-12  text-center items-center">
            <RiHome2Line size={24} />
            Home
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col w-12 h-12  text-center items-center">
            <RiPieChart2Line size={24} />
            Expenses
          </div>
        </div>
        <div className="p-2 bg-black text-white rounded-full -translate-y-4">
          <div className="flex flex-col w-12 h-12  text-center items-center justify-center">
            <RiBankCard2Fill size={24} />
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col w-12 h-12  text-center items-center">
            <RiBarChart2Line size={24} />
            Invest
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col w-12 h-12  text-center items-center">
            <RiCalendarCheckLine size={24} />
            Goals
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
