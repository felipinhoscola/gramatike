import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div
      className="flex h-full flex-1 flex-col px-3"
      //  style={{
      //   height:
      // }}
    >
      <div className="flex flex-1">
        <Textarea
          className="h-32 resize-none"
          placeholder={t("textAreaPlaceholder")}
        />
      </div>
      <div className="flex h-full flex-1 items-center justify-between">
        <Button className="h-8 w-8 rounded-xl p-0">
          <IoSettingsOutline size={24} />
        </Button>
        <Button className="h-8 rounded-xl p-2">
          {t("sendMessageButton")}
          <IoMdSend style={{ marginLeft: "3px" }} width="10" height="10" />
        </Button>
      </div>
      {/* <LangToggle />
      <ToggleTheme />
      <Footer /> */}
    </div>
  );
}
