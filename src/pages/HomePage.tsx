import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { sendProcessText } from "@/helpers/process_text_helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextSchema = z.object({
  rawText: z.string().min(3),
});

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof TextSchema>>({
    mode: "onChange",
    resolver: zodResolver(TextSchema),
  });
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSendText = async (data: z.infer<typeof TextSchema>) => {
    setIsLoading(true);
    form.clearErrors();

    const responseMessage = await sendProcessText(data.rawText);

    await navigator.clipboard.writeText(responseMessage);
    setIsLoading(false);
    form.reset({ rawText: "" });
    toast({
      duration: 1000,
      description: "Texto foi copiado 😁",
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-1 flex-col px-3">
        <FormField
          control={form.control}
          name="rawText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-32 resize-none"
                  placeholder={t("textAreaPlaceholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex h-full flex-1 items-center justify-between">
          <Button className="h-8 w-8 rounded-xl p-0">
            <IoSettingsOutline size={24} />
          </Button>
          <Button
            className="h-8 rounded-xl p-2"
            type="submit"
            onClick={form.handleSubmit(handleSendText)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {t("sendMessageButton")}
                <IoMdSend
                  style={{ marginLeft: "3px" }}
                  width="10"
                  height="10"
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
