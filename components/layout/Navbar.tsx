"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import "./sidebar.css";

const Navbar = () => {
  const pathname = usePathname();

  const getPageLabel = () => {
    console.log("path->", pathname);

    switch (pathname) {
      case "/products":
        return "Products";
      case "/customers":
        return "Customers";
      case "/dashboard":
        return "Overview";
      case "/settings":
        return "Settings";
      default:
        return "Leads";
    }
  };

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="heading-label text-sm text-gray-500">
        Dashboard /{" "}
        <span className="text-gray-900 font-medium capitalize">
          {getPageLabel()}
        </span>
      </div>

      <div className="flex items-center gap-4 cursor-pointer">
        <Bell
          size={20}
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        />

        {/* profile info */}
        <div className="flex items-center gap-3 border-l pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-900">Muhammed Anas</p>
            <p className="text-[10px] text-gray-400">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
