const electron = require('electron');
const Datastore = require('nedb');
const buildInitialTemplate = require("./main_utils/buildInitialTemplate");
const installExtensions = require("./main_utils/installExtensions");

const {app, ipcMain} = electron;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start({
  companyName: 'МИФИ Кафедра №22 "Кибернетика"',
  productName: 'Лабораторная система по курсу ММФП',
  submitURL: 'localhost',
  autoSubmit: true,
  extra: {
    'prod': 'Лабораторная система по курсу ММФП',
    'key': '0.0.1',
    'email': 'eakarpov@yandex.ru',
    'comments': ''
  }
});

let mainWindow = null;
const initialTemplate = buildInitialTemplate(mainWindow);

db = new Datastore({filename: 'my.db'});
db.loadDatabase(function (err) {
  if (err) console.log(err);
});
global.db = db;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {

  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({width: 1280, height: 720});
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  const menu = electron.Menu.buildFromTemplate(initialTemplate);
  electron.Menu.setApplicationMenu(menu);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

ipcMain.on('admin_logged_in', function () {

  const newTemplate = initialTemplate;
  const adminMenu = {
    label: 'Администратору',
    submenu: [
      {
        label: 'Инструкция администратора',
        click() {
          mainWindow.webContents.send('transitionTo', '/instruction/admin')
        }
      }
    ]
  };
  newTemplate.splice(2, 0, adminMenu);

  const menu = electron.Menu.buildFromTemplate(newTemplate);
  electron.Menu.setApplicationMenu(menu);

});
