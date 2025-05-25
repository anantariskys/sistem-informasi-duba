import React from "react";
import { FiSidebar } from "react-icons/fi";

interface TopSidebarProps {
  setIsColapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
}
const TopSidebar: React.FC<TopSidebarProps> = ({
  isCollapsed,
  setIsColapsed,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200">
      <div className="overflow-hidden whitespace-nowrap">
        <h1
          className={`text-2xl font-semibold text-gray-900 transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
        >
          Untitled UI
        </h1>
      </div>
      <button
        onClick={() => setIsColapsed(!isCollapsed)}
        className={`${isCollapsed ? "mx-auto" : ""}`}
      >
        <FiSidebar className="size-6" />
      </button>
    </div>
  );
};

export default TopSidebar;