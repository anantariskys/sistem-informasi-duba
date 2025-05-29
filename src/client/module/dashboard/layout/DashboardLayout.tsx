'use client';
import Sidebar from '@/client/components/Sidebar/index';
import { ReactNode } from 'react';

import useLogout from '../hooks/useLogout';
import ConfirmModal from '@/client/components/ConfirmModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { handleLogout, isOpen, toggleModal } = useLogout();
  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={toggleModal} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          </main> */}
        {children}
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={toggleModal}
        onConfirm={handleLogout}
        type="error"
        title="Log out account"
        description="You’re about to log out from your account. Do you want to continue?"
      />
    </div>
  );
}
