import { Role } from "@prisma/client";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function BottomSidebar({
  isCollapsed,
  onLogout,
  user,
}: {
  isCollapsed: boolean;
  onLogout: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: Role;
  };
}) {
  const sharedButtonClasses = `w-full flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ${
    isCollapsed ? "justify-center" : ""
  }`;

  const iconClasses = (isCollapsed: boolean) =>
    `size-5 ${!isCollapsed ? "mr-3" : ""}`;

  const textClasses = `transition-all duration-300 ${
    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
  } overflow-hidden whitespace-nowrap`;

  return (
    <div className="mt-auto px-3 pb-4">
      <div className="space-y-2">
        <button onClick={onLogout} className={sharedButtonClasses}>
          <FiLogOut className={iconClasses(isCollapsed)} />
          <span className={textClasses}>Logout</span>
        </button>

        <div className="pt-2 border-t w-full">
          <Link href="/dashboard/profile" className={sharedButtonClasses}>
            <FiUser className={iconClasses(isCollapsed)} />
            <span className={textClasses}>
              <p className="font-semibold">{user?.name}</p>
              <p>{user?.email}</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
