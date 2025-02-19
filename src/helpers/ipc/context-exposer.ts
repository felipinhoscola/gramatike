import { exposeProcessTextContext } from "./process-text/process-text-context";
import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeProcessTextContext();
}
