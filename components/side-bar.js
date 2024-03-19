"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import ChevronRight from "./icons/chevron-right";
import TheSquares from "./icons/squares";
import TheUsers from "./icons/user";
import UserGroup from "./icons/user-group";
import TheLibrary from "./icons/library";
import TheHamburger from "./icons/hamburger";
import PageTitle from "./page-title";

export const links = [
  {
    title: "Dashboard",
    href: "/",
    variant: "default",
    icon: TheSquares,
  },
  {
    title: "Students",
    href: "/students",
    variant: "ghost",
    icon: TheUsers,
  },
  {
    title: "Teachers",
    href: "/teachers",
    variant: "ghost",
    icon: UserGroup,
  },
  {
    title: "Departments",
    href: "/departments",
    variant: "ghost",
    icon: TheLibrary,
  },
];
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathName = usePathname();

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[60px] border-r px-2 pb-10 pt-4">
      <div className="flex justify-between items-center pb-6 px-4">
        {!isCollapsed && (
          <Link href="/">
            <PageTitle title="SMS" className="hidden lg:block" />
          </Link>
        )}
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="p-2 block"
        >
          <TheHamburger className="h-4 w-4" />
        </Button>
      </div>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-2 pl-2 pr-6 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, idx) =>
            isCollapsed ? (
              <Link
                key={idx}
                href={link.href}
                aria-label={link.title}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : "ghost",
                    size: "icon",
                  }),
                  "h-9 w-9"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.title}</span>
              </Link>
            ) : (
              <Link
                key={idx}
                href={link.href}
                aria-label={link.title}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : "ghost",
                    size: "sm",
                  }),
                  "justify-start font-semibold text-sm"
                )}
              >
                <link.icon className="lg:mr-2 h-5 w-5 lg:h-4 lg:w-4" />
                <span className="hidden lg:block">{link.title}</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
