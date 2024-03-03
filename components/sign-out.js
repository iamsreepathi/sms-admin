"use client";
import { signOut, useSession } from "next-auth/react";
import UserCircle from "./icons/user-circle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import ChevronDown from "./icons/chevron-down";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { data } = useSession();
  const router = useRouter();
  const logOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };
  return (
    <nav className="flex justify-end pt-4 pr-8">
      {data?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Account Settings <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logOut}>
                Log out
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!data && (
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
      )}
    </nav>
  );
}
