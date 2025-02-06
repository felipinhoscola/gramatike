import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/template/NavigationMenu";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DragWindowRegion title="Gramatike" />
      {/* <NavigationMenu /> */}
      <main className="p-2" style={{ height: "205px" }}>
        {children}
      </main>
    </>
  );
}
