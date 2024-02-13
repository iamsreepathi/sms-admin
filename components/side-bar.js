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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

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
    <div className="relative min-w-[60px] border-r px-2 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7 hidden lg:block">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-2 px-4 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, idx) =>
            isCollapsed ? (
              <Link
                key={idx}
                href={link.href}
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
