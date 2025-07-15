"use client";
import React from "react";
import { useState } from "react";
import Container from "./Container";
import CodeGuruLogo from "../components/CodeGuruLogo";
import Sidebar from "../components/Sidebar";
import { NavbarData } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";


import { Menu } from "lucide-react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-b-emerald-900/10 relative">
      <Container classname="py-5 flex justify-between items-center">
        <CodeGuruLogo />

        <div className="hidden md:inline-flex items-center gap-7 text-sm uppercase tracking-wide font-medium">
          {NavbarData?.map((item) => (
            <Link
              key={item?.name}
              href={item?.href}
              className={`hover:text-emerald-700 hovereffect relative group ${
                pathname === item?.href ? "text-emerald-700" : ""
              }`}
            >
              {item?.name}
              <span
                className={`w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent inline-block absolute left-0 -bottom-1 ${
                  pathname === item?.href ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100 transition-transform duration-300`}
              />
            </Link>
          ))}
          <a
            href="nabir.pdf"
            target=""
            rel="noopener noreferrer"
            className=" text-sm bg-emerald-950/50 text-white px-4 py-2 rounded-md border border-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black hovereffect"
          >
            Hire me
          </a>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden inline-flex"
        >
          <Menu className="hover:text-emerald-700 hovereffect " />
        </button>
      </Container>
      <div className="md:hidden ">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pathname={pathname ?? ""}
        />
      </div>
    </header>
  );
};

export default Header;
