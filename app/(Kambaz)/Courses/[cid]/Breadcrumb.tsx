"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  const last = pathname?.split("/").filter(Boolean).pop();
  const section = last === "Table" && pathname?.includes("/People/") ? "People" : last || "Home";
  return (
    <span>
      {course?.name} &gt; {section}
    </span>
  );
}
