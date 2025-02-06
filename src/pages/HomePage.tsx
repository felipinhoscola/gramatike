import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col">
      {/* <LangToggle />
      <ToggleTheme />
      <Footer /> */}
    </div>
  );
}
