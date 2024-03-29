"use client";
import Link from "next/link";
import { links } from "./side-bar";
import { Button } from "./ui/button";

export default function TheFooter() {
  return (
    <div className="px-4 lg:px-8 py-2 border-t md:flex md:justify-between md:items-center text-sm">
      <p className="text-primary">
        @2024 devopscareer.us. All rights reserved.
      </p>
      <div>
        {links.map((l) => (
          <Button className="pl-0 lg:px-4" key={l.title} variant="link">
            <Link href={l.href}>{l.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
