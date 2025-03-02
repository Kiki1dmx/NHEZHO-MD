const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZodDA1bnNaS0ZWZ1lURFdISWQvMXgrMmtFTE9qclNPdjdJVjhuS3gydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHE2Z0dBS2dTUFY0QWpDRFNCd2lHUVA0aXNsNHVwc2dEdG5ZTVRITVVpbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSi9PU3JrZFZ6bzJ6K29vTDVGMHV4NWZMOUo4VmJpWUM3VHBWMGJpRGtvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwaC8xVTJkV0FxVGdwWFZRWDN2cFZkM3ZtdmN0clNkQ1pqcmU2Qm11ZDEwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVDdEllb3lGd1BjTUw1Y1BKNzhFcnBobTR3azB3b2h0QlJXN2JZbSs3MWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlgwcC8xK3hycTY0b2RJOUVtSXZXamZKcDQ5Z0grb3lmOGtSeUlmOUxuR0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUlaSEZUU0lZY2dkcWFRVWljaHdoWFlGRTdrUmdJeHU2V1RjSGgxTHlXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmZ4a3ZveUV0TmFvQjF1cGlrRGF2cGVNOUdXaHlkMzNzYUl6VUt3cm1STT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ1dXJSVkMvWDBIQ0NkYWVsQVNKVXFrcDI1R3IvZkNxdFZNZStEWERyUDExMzhqZGU3eFVDWitUb2grc0hDK1pyMmNRZ2o2ajFTNGIyZFFuWDgvYkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJZWm1TWmowVWwyOGJGdC9Rc3o0RHZmbGNmK2tCMWswRTJrNktNenMwS0NZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmeF95Q3oteFI0eWNYQXM5N0c4SVF3IiwicGhvbmVJZCI6ImUyOWJmZmQ2LTZlZWItNDUzNi1iZmJhLWE4MmQyODFhNTBiNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXYk00Wnh0MTJyR3dnMkttQWhHTGFXSzNrN0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWRUNU9ucDA1NEx1akZnUm9vS1N1NkZhWWdjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRIMTNOUVJYIiwibWUiOnsiaWQiOiI0MDcyMTUzNDQ2Njo4M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXlyNXBZR0VQTDVrYjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiS3Vna2tOc0Y1VklEMmNGVVBPQk9DeTNXWmZMSGRDcW1ad1hOOW42VDVEMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoidXFKUy8xcWN3Y1EwTnNjZVZBdWxzK3JudzMvVndTRXZVMXROR1lOQlhCQXEzOWxJZjBhT2ttVSs5UXdCUDdZdzNXU2V5a2ZSNzFweXFBV2NjUEZvREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVVblNpYWE5bXFFY0h3SmdXSExQaGh0UDB6VlNDditsZ3ZacUpwZEJ2M3BlUjE1aytvemtXSHZaQ0Z0SGlmdFBlR3RMYkFsSVR3ajU5c21Ucm5uMUJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3MjE1MzQ0NjY6ODNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3JvSkpEYkJlVlNBOW5CVkR6Z1Rnc3QxbVh5eDNRcXBtY0Z6ZloraytROSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDkzMDMwNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJb0MifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "kiki",
    CAPTION : process.env.CAPTION || "KIKI-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "40721534466",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    ANTICALL: process.env.ANTICALL || 'no',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'KIKI XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://ibb.co/zTbqN45y',
    URL: process.env.URL || "https://ibb.co/zTbqN45y",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "no",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
