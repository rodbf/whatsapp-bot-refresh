import WWeb from 'whatsapp-web.js';
import {toString as parseB64ToQR} from 'qrcode';
import {processMessage} from './message-processor.js';
const {Client, LocalAuth} = WWeb;

const client = new Client({
  authStrategy: new LocalAuth({clientId: 'whatsbot-refresh'}),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-extensions',
      '--no-first-run'
    ]
  }
});

client.once('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', async (b64) => {
  try{
    console.log(await parseB64ToQR(b64));
  }
  catch(error){
    console.error(error);
  }
});

client.on('authenticated', () => {
    console.log("AUTHENTICATED");
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('loading_screen', (percent, message) => {
  console.log('LOADING SCREEN', percent, message);
});

client.on('message', message => {
  processMessage(message);
});

client.initialize();