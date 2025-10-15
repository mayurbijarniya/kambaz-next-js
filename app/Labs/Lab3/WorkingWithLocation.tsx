"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function WorkingWithLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log("Pathname:", pathname);
  console.log("Search:", searchParams.toString());

  return (
    <div id="wd-working-with-location">
      <h4>Working with Location</h4>
      <p>Pathname: {pathname}</p>
      <p>Search: {searchParams.toString() || "(none)"}</p>
      <hr />
    </div>
  );
}
