import { ipcMain } from "electron";
import { PROCESS_TEXT_SEND_CHANNEL } from "./process-text-channels";
import { ChatDeepSeek } from "@langchain/deepseek";

export function addProcessTextEventListeners() {
  ipcMain.handle(PROCESS_TEXT_SEND_CHANNEL, async (e, rawText: string) => {
    const model = process.env.OPENROUTER_LLM_MODEL;
    const urlOpenRouter = process.env.OPENROUTER_API_URL;
    const apiKeyOpenRouter = process.env.OPENROUTER_API_KEY;

    const llm = new ChatDeepSeek({
      model,
      temperature: 1,
      configuration: {
        baseURL: urlOpenRouter,
      },
      apiKey: apiKeyOpenRouter,
      streaming: false,
    });

    const data = await llm.invoke([
      {
        role: "assistant",
        content: `
        Você é um especialista em ortografia, correções de texto, reescrita, melhoria e altamente fluente em ingles.
        Seu objetivo é corrigir a ortografia do texto enviado pelo usuário.
        Responda sempre em Portugues Brasil a menos que o que tenha o translate.

        Caso antes do texto tenha "improve:" você deve melhorar, enriquecer e corrigir a ortografia, mantendo o sentido do texto.
        Caso antes do texto tenha "translate:" você deve traduzir o texto para ingles da melhor meneira possivel.
        Envie o resultado do texto sem formatação alguma, apenas o texto limpo.
      `,
      },
      {
        role: "user",
        content: rawText,
      },
    ]);
    return data.content;
  });
}
