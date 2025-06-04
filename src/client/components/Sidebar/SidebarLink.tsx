import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  adminNavigation: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  adminNavigation,
  isCollapsed,
}) => {
  const pathname = usePathname();


  return (
    <nav className="mt-5 px-3 space-y-1 text-gray-600">
      {adminNavigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center px-4 py-2.5 rounded-lg 
              transition-all duration-300
              ${isActive ? 'bg-magentaPink-start/10 text-darkPurple font-medium' : 'hover:bg-gray-50'} ${isActive ? 'bg-magentaPink-start/10 text-darkPurple font-medium' : ''}
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon
              className={`
                h-5 w-5 flex-shrink-0 
                transition-all duration-300
                ${!isCollapsed ? 'mr-3' : ''}
                ${isActive ? '' : ''}
              `}
            />
            <span
              className={`
                transition-all duration-300
                ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                overflow-hidden whitespace-nowrap
              `}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarLink;
