// Native
import { join } from "path"
import { format } from "url"

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"

// Prepare the renderer once the app is ready
app.on(`ready`, async () => {
  await prepareNext(`./src`)

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, `preload.js`),
    },
  })

  const url = isDev
    ? `http://localhost:8000/`
    : format({
        pathname: join(__dirname, `../src/out/index.html`),
        protocol: `file:`,
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on(`window-all-closed`, app.quit)

app.on(`ready`, () => {})

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on(`message`, (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send(`message`, `hi from electron`), 500)
})

const path = require(`path`)
const util = require(`util`)
const fs = require(`fs`)

const read = util.promisify(fs.readFile)

const getFileContents = async (filename: any) => {
  const contents = await read(filename, `utf8`)
  return contents
}

ipcMain.on(`src`, async (event: IpcMainEvent) => {
  const fileName = path.join(__dirname, `../../../src/pages/project`, `BLub.js`)
  const code = await getFileContents(fileName)
  event.reply(`src-reply`, code)
})

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
