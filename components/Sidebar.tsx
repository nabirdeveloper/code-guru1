"use client";
import React, { FC } from "react";
import CodeGuruLogo from "./CodeGuruLogo";
import { NavbarData } from "@/constants";
import SocailLinks from "./SocailLinks";
import { useOutSideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, pathname }) => {
  const SidebarRef = useOutSideClick<HTMLDivElement>(onClose);
  return (
    <div
      ref={SidebarRef}
      className={`fixed inset-y-0 right-0 z-50 min-w-72 bg-gray-900/95 backdrop-blur-md border-l border-emerald-600/20 shadow-2xl shadow-emerald-600/30 transform
    ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
    >
      <div className="flex justify-end p-4">
        <button
          className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:rotate-90"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col px-5 gap-7 mt-8">
        <CodeGuruLogo />

        {NavbarData?.map((item) => (
          <Link
            onClick={onClose}
            key={item?.name}
            href={item?.href}
            className={`
              text-gray-300 hover:text-emerald-400 transition-all duration-300 
              relative group ${
                pathname === item?.href ? "text-emerald-400 font-medium" : ""
              }
             
              hover:before:w-full ${
                pathname === item?.href ? "before:w-full" : ""
              }
            `}
          >
            {item?.name}
            <span
              className={`w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent inline-block absolute left-0 -bottom-1 ${
                pathname === item?.href ? "scale-x-100" : "scale-x-0"
              } group-hover:scale-x-100 transition-transform duration-300`}
            />
          </Link>
        ))}

        <Link
          href="resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-sm bg-emerald-900/30 text-emerald-300 px-4 py-2 rounded-lg 
            border border-emerald-600/30 hover:border-emerald-400 
            hover:bg-emerald-800/40 hover:text-white 
            transition-all duration-300 ease-out 
            hover:shadow-[0_0_15px_-3px_rgba(110,231,183,0.3)]
            hover:-translate-y-0.5 w-fit
            flex items-center justify-center gap-2
            relative overflow-hidden
            after:content-[''] after:absolute after:top-0 after:left-0 
            after:w-full after:h-full after:bg-emerald-500/10 
            after:translate-y-full after:hover:translate-y-0 
            after:transition-transform after:duration-300
          "
        >
          Hire me
        </Link>

        <SocailLinks />
      </nav>
    </div>
  );
};

export default Sidebar;
