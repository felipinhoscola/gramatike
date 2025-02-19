import { PROCESS_TEXT_SEND_CHANNEL } from "./process-text-channels";

export function exposeProcessTextContext() {
  const { contextBridge, ipcRenderer } = require("electron/renderer");

  contextBridge.exposeInMainWorld("processText", {
    send: (rawText: string) =>
      ipcRenderer.invoke(PROCESS_TEXT_SEND_CHANNEL, rawText),
  });
}
