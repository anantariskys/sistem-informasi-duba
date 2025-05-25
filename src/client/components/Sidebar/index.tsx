"use client";

import React, { useState } from "react";
import {
  FiHome,

} from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import BottomSidebar from "./BottomSidebar";
import SidebarLink from "./SidebarLink";
import TopSidebar from "./TopSidebar";
import { useSession } from "next-auth/react";

interface SidebarProps {
  onLogout: () => void;
}

const navigation = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Student", href: "/student", icon: TbUsers },
];


export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = useSession();

  

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-80"
      } flex flex-col relative z-50 justify-between bg-white border-r border-gray-200 min-h-screen text-gray-900 rounded-tr-2xl transition-all duration-300`}
    >
      <div>
        <TopSidebar isCollapsed={isCollapsed} setIsColapsed={setIsCollapsed} />

        <SidebarLink adminNavigation={navigation} isCollapsed={isCollapsed} />
      </div>

      <BottomSidebar
        user={session?.user}
        isCollapsed={isCollapsed}
        onLogout={onLogout}
      />
    </div>
  );
}