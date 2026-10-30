"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils"; // Import cn utility

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          alt="logo"
          width={160}
          height={50}
          src="/assets/icons/logo-full-brand.svg"
          className="hidden h-auto lg:block"
          priority
        />
        <Image
          alt="logo"
          width={52}
          height={52}
          src="/assets/icons/logo-brand.svg"
          className="lg:hidden"
          priority
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            const isActive = pathname === url;

            return (
              <li key={url}>
                <Link
                  href={url}
                  className={cn(
                    "flex items-center gap-4 rounded-full p-3 transition-colors",
                    isActive
                      ? "bg-brand text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn("nav-icon", isActive && "nav-icon-active")}
                  />
                  <p className="hidden lg:block">{name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Image src="/assets/images/files-2.png" alt="Logo" height={506} width={418} className="w-full"/>
      <div className="sidebar-user-info">
        
      <Image src={avatarPlaceholderUrl} alt="Avtar" height={44} width={44} className="sidebar-user-avatar"/>

      </div>
    </aside>
  );
};

export default Sidebar;