"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
// Prepare the renderer once the app is ready
electron_1.app.on(`ready`, async () => {
    await (0, electron_next_1.default)(`./src`);
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, `preload.js`),
        },
    });
    const url = electron_is_dev_1.default
        ? `http://localhost:8000/`
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, `../src/out/index.html`),
            protocol: `file:`,
            slashes: true,
        });
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on(`window-all-closed`, electron_1.app.quit);
electron_1.app.on(`ready`, () => { });
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on(`message`, (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send(`message`, `hi from electron`), 500);
});
const path = require(`path`);
const util = require(`util`);
const fs = require(`fs`);
const read = util.promisify(fs.readFile);
const getFileContents = async (filename) => {
    const contents = await read(filename, `utf8`);
    return contents;
};
electron_1.ipcMain.on(`src`, async (event) => {
    const fileName = path.join(__dirname, `../../../src/pages/project`, `BLub.js`);
    const code = await getFileContents(fileName);
    event.reply(`src-reply`, code);
});
/* const { exec } = require(`child_process`) */
/* ipcMain.on(`build`, async (event: IpcMainEvent) => {
  const child = exec(`npm run build:trigger`, { stdio: `inherit` })

  child.stdout.on(`data`, function (data: any) {
    console.info(`proc_stdout: ` + data)
  })

  child.stderr.on(`data`, function (data: any) {
    console.info(`proc_stderr: ` + data)
  })

  child.on(`close`, (code: any) => {
    console.log(`Close: child process exited with code ${code}`)
    event.reply(`build-reply`, `Build finished`)
  })

  child.on(`disconnect`, (code: any) => {
    console.log(`Disconnected: ${code}`)
  })

  child.on(`error`, (code: any) => {
    console.log(`Error: ${code}`)
  })

  child.on(`exit`, (code: any) => {
    console.log(`Exit: child process exited with code ${code}`)
  })
}) */
