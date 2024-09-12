const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
//para exportar basta fazer dessa forma
const { handleMessage } = require("./src/chat_message");

// Inicializa o cliente
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// Gera um QR code para autenticação no WhatsApp
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escaneie o QR code acima no WhatsApp para se conectar.");
});

// Indica que o cliente está pronto para uso
client.on("ready", () => {
  console.log("Cliente está pronto!");
});

// Responde a mensagens recebidas
client.on("message", async (message) => {
  await handleMessage(message);
});

// Inicializa o cliente
client.initialize();