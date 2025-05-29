'use client';

import React, { useState } from 'react';
import { FiHome, FiUserCheck, FiUserPlus, FiUsers } from 'react-icons/fi';
import BottomSidebar from './BottomSidebar';
import SidebarLink from './SidebarLink';
import TopSidebar from './TopSidebar';
import { useSession } from 'next-auth/react';

interface SidebarProps {
  onLogout: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'Penanggung Jawab', href: '/penanggung-jawab', icon: FiUsers },
  { name: 'Guru Tugas', href: '/guru-tugas', icon: FiUserCheck },
  { name: 'Calon Guru Tugas', href: '/calon-guru-tugas', icon: FiUserPlus },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = useSession();

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-80'
      } flex flex-col z-20 justify-between h-screen sticky top-0 bg-white border-r border-gray-200 min-h-screen text-gray-900 rounded-tr-2xl transition-all duration-300`}
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
