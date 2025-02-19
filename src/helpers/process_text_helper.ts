export function sendProcessText(rawText: string) {
  return window.processText.send(rawText);
}
