'use client';

import React, { useState, useMemo } from 'react';
import { FiHome, FiUserCheck, FiUserPlus, FiUsers } from 'react-icons/fi';
import BottomSidebar from './BottomSidebar';
import SidebarLink from './SidebarLink';
import TopSidebar from './TopSidebar';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

interface SidebarProps {
  onLogout: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: FiHome, role: [Role.superadmin, Role.admin] },
  { name: 'Admin', href: '/admin', icon: FiUserPlus, role: [Role.superadmin] },
  { name: 'Penanggung Jawab', href: '/penanggung-jawab', icon: FiUsers, role: [Role.superadmin, Role.admin] },
  { name: 'Guru Tugas', href: '/guru-tugas', icon: FiUserCheck, role: [Role.superadmin, Role.admin] },
  { name: 'Calon Guru Tugas', href: '/calon-guru-tugas', icon: FiUserPlus, role: [Role.superadmin, Role.admin] },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = useSession();

  // Filter navigation based on user role
  const filteredNavigation = useMemo(() => {
    if (!session?.user?.role) return [];
    return navigation.filter(item => item.role.includes(session.user.role as Role));
  }, [session?.user?.role]);

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-80'
      } flex flex-col z-20 justify-between h-screen sticky top-0 bg-white border-r  border-gray-200 min-h-screen text-gray-900 rounded-tr-2xl transition-all duration-300`}
    >
      <div>
        <TopSidebar isCollapsed={isCollapsed} setIsColapsed={setIsCollapsed} />
        <SidebarLink adminNavigation={filteredNavigation} isCollapsed={isCollapsed} />
      </div>

      <BottomSidebar
        user={session?.user}
        isCollapsed={isCollapsed}
        onLogout={onLogout}
      />
    </div>
  );
}
