import Image from 'next/image';
import React from 'react';
import { FiSidebar } from 'react-icons/fi';

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
        <Image
          src={'/images/logo.png'}
          alt='logo'
          width={200}
          height={50}
          priority
          className={`${isCollapsed ? 'w-0' : ''} transition-all duration-300 ease-in-out`}
        />
      </div>
      <button
        onClick={() => setIsColapsed(!isCollapsed)}
        className={`${isCollapsed ? 'mx-auto' : ''}`}
      >
        <FiSidebar className="size-6" />
      </button>
    </div>
  );
};

export default TopSidebar;
