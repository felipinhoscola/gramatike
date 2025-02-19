import {
  app,
  BrowserWindow,
  Event,
  globalShortcut,
  Menu,
  screen,
  Tray,
} from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import dotenv from "dotenv";

//TODO: nao terei envs salvas, isso é apenas para desenvolvimento enquanto nao crio o settings da forma que pensei, armazenando tudo em json, ja que o app vai ficar por conta do usuario mesmo
dotenv.config();
const inDevelopment = process.env.NODE_ENV === "development";

// if (require("electron-squirrel-startup")) {
//   app.quit();
// }

function handleQuit() {
  if (process.platform !== "darwin") {
    mainWindow?.destroy();
    app.quit();
  }
}

let mainWindow: BrowserWindow | null;
function createWindow() {
  const preload = path.join(__dirname, "preload.js");

  //get screenSize
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const windowWidth = 480;
  const windowHeight = 240;

  const xPosition = width - windowWidth - 10;
  const yPosition = height - windowHeight - 10;
  mainWindow = new BrowserWindow({
    x: xPosition,
    y: yPosition,
    width: 480,
    height: 240,
    webPreferences: {
      // devTools: inDevelopment,
      devTools: true,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      preload: preload,
    },
    titleBarStyle: "hidden",
    resizable: false,
    maximizable: false,
  });

  try {
    const iconPath = app.isPackaged
      ? path.join(__dirname, "../assets/images/icon.png")
      : path.join(__dirname, "../../src/assets/images/icon.png");
    console.log("Ícone existe:", require("fs").existsSync(iconPath));
    mainWindow.setIcon(iconPath);
  } catch (error) {
    console.error("Erro ao carregar ícone:", error);
  }

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    mainWindow?.webContents.toggleDevTools();
  });

  registerListeners(mainWindow);
  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow?.hide();
  });

  // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  //   console.log("Loading URL:", MAIN_WINDOW_VITE_DEV_SERVER_URL);
  //   mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  // } else {
  //   console.log(
  //     "Loading file from:",
  //     path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
  //   );
  //   mainWindow
  //     .loadFile(
  //       path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
  //     )
  //     .catch((err) => {
  //       console.error("Failed to load app:", err);
  //     });
  // }
  mainWindow.loadURL(
    app.isPackaged
      ? `file://${__dirname}/../renderer/main_window/index.html`
      : MAIN_WINDOW_VITE_DEV_SERVER_URL,
  );

  mainWindow.webContents.on("did-fail-load", (event, code, desc) => {
    console.error("Failed to load:", code, desc);
  });
}

let tray = null;
async function initiateApp() {
  try {
    //Global ShortCuts Session
    globalShortcut.register("Alt+Space", () => {
      if (mainWindow) {
        if (mainWindow.isVisible()) return mainWindow.hide();

        mainWindow.show();
        mainWindow.focus();
      }
    });
    //Tray Session
    const iconPath = app.isPackaged
      ? path.join(__dirname, "../assets/images/icon.ico")
      : path.join(__dirname, "../../src/assets/images/icon.ico");

    console.log("iconPath", iconPath);
    tray = new Tray(iconPath);

    tray.setToolTip("Gramatike");

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Show App",
        click: () => mainWindow?.show(),
      },
      {
        label: "Quit",
        click: handleQuit,
      },
    ]);
    tray.setContextMenu(contextMenu);

    tray.on("click", () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
  } catch {
    console.error("Failed to install extensions");
  }
}
async function installExtensions() {
  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch {
    console.error("Failed to install extensions");
  }
}

app.whenReady().then(createWindow).then(installExtensions).then(initiateApp);

app.on("window-all-closed", () => {});
// app.on("window-all-closed", (event) => {
//   //commented because the app is a tray app, and if the user want to close, tray has a menu for quit app
//   // if (process.platform !== "darwin") {
//   //   app.quit();
//   // }
// });

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  globalShortcut.unregisterAll();
  mainWindow = null;
  tray = null;
});
//osX only ends
