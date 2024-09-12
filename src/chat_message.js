const pedidosMap = new Map();
const userLastMessageMap = new Map();
const userTimeouts = {};
let botStartTime = Date.now();
let retirada = "";

const {pedidosRealizados} = require ("./pedidos_chat");
const {pagamentoChat} = require ("./pagamento_chat");
const {entregaChat} = require ("./entrega_chat");
const {retiradaChat} = require ("./retirada_chat");
const {cedulaChat} = require ("./cedula_chat");
const {pixChat} = require ("./pix_chat");
const {agradecimentosChat} = require ("./agradecimentos_chat");
const {enderecoChat} = require ("./endereco_chat");

const { manager } = require("./nlp_node");

// Criar o gerenciador de NLP


async function handleMessage(message) {
  const contact = await message.getContact();
  const chat = await message.getChat();

  // bloco para quando ligar o bot nao disparar mensagens
  let senderName = contact.pushname || contact.name || contact.number;
  const messageTimestamp = message.timestamp * 1000;
  if (messageTimestamp < botStartTime) {    return;
  }

  // Armazena a última mensagem do usuário
  userLastMessageMap.set(senderName, messageTimestamp);

  // Cancela o temporizador existente, se houver, para evitar mensagens duplicadas
  if (userTimeouts[senderName]) {
    clearTimeout(userTimeouts[senderName]);
  }

  // Check if the message is from a group
  if (chat.isGroup) return;

 

  const currentHour = new Date().getHours();
  const finishHour = 23;
  const startHour = 9;

  // Respond based on business hours
  if (currentHour >= startHour && currentHour <= finishHour) {
    await handleBusinessHours(message, chat, senderName, retirada);
  } else {
    //await message.reply(
    //"Nosso horário de atendimento é das 9h às 14h. Assim que possível entraremos em contato!"
    //);
    await handleBusinessHours(message, chat, senderName, retirada);
  }
}

async function handleBusinessHours(message, chat, senderName) {
  const lowerMessage = message.body.toLowerCase();
  const valorRegex = /\d+/;
  const contact = await message.getContact();
  const response = await manager.process('pt', message.body.toLowerCase());

  if (response.intent === 'saudacao') {
    await chat.sendMessage('Olá, sou o chatbot e irei realizar o seu atendimento! Seja bem vindo(a) a Marmitaria Novo Tempero! 🍲🥗🍴');
    
    await chat.sendMessage('O que gostaria de pedir hoje?');
  }
   if(response.intent === 'ccb')
    {
    await chat.sendMessage('Amém!');
    
    await chat.sendMessage('Seja bem vindo(a) a Marmitaria Novo Tempero! 🍲🥗🍴');
    
    await chat.sendMessage('O que gostaria de pedir hoje?');
    }

    
    userTimeouts[senderName] = setTimeout(async () => {
      await pedidosRealizados(message, chat, senderName,pedidosMap,userTimeouts, manager);
    }, 1500);
  
    await pagamentoChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);
    
    await entregaChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);

    await retiradaChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);
    
    await cedulaChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);

    await enderecoChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);

  if (
    message.body.toLowerCase().includes("sim") ||
    message.body.toLowerCase().includes("Sim")
  ) {
    await chat.sendMessage("Qual valor precisa para o troco?");
    return;
  }

  if (
    message.body.toLowerCase().includes("nao") ||
    message.body.toLowerCase().includes("não")
  ) {
    await chat.sendMessage("Retirada ou entrega 🛵?");

    return;
  }

  // Verifica se a mensagem contém um valor numérico
  if ((valorRegex.test(message.body)&& message.body<100)) {
    
    if (!pedidosMap.has(senderName)) {
      pedidosMap.set(senderName, []);
    }

    // Garante que o valor é um array antes de adicionar o novo pedido
    let pedidos = pedidosMap.get(senderName);
    if (!Array.isArray(pedidos)) {
      pedidos = [pedidos]; // Converte o valor em um array se não for um
    }

    // Adiciona o novo pedido à lista do usuário se não estiver presente
    if (!pedidos.includes(message.body)) {
      pedidos.push(message.body);

      // Atualiza o mapa com a lista atualizada
      pedidosMap.set(senderName, pedidos);
    }

    await chat.sendMessage("Enviaremos o troco conforme solicitado !");
    if(!contact.isMyContact)
      {
        await chat.sendMessage("Qual o Endereço para a entrega 🛵?");
        await chat.sendMessage(
          "Obs: Informe se é rua, avenida ou projetada por gentileza."
        );}else{   await chat.sendMessage(
          "Iremos preparar o seu pedido e logo estaremos te enviando.\nO tempo estimado para entrega é de 20 a 40 minutos.\n\nAgradecemos pela preferência!"
        );
        await chat.sendMessage("Tenha um ótimo dia e volte sempre!");}
    
    return;
  }


  await pixChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);
  
  await agradecimentosChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact);
  

// Verificação para mídia recebida
if (message.hasMedia) {
  console.log("Mídia recebida.");
  await handleMediaMessage(message);
  return;
}

async function handleMediaMessage(message) {
  const media = await message.downloadMedia();

  if (media.mimetype.startsWith("image")) {
    await message.reply("Agradecemos pelo pagamento!");
  } else if (media.mimetype.endsWith("pdf")) {
    await message.reply("Agradecemos pelo pagamento!");
  } 
}
}

module.exports = {
  handleMessage,
};
