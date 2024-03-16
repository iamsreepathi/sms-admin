"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DataSearch({ placeholder = "" }) {
  const [search, setSearch] = useState("");
  return (
    <div className="w-full md:w-1/2 flex space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Button variant="outline">search</Button>
    </div>
  );
}
