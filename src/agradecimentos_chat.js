
async function agradecimentosChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact) {
    const response = await manager.process('pt', message.body.toLowerCase());

    
    if (response.intent === 'agrad')  {
        
        await chat.sendMessage("Tenha um ótimo dia e volte sempre! Irei finalizar seu atendimento virtual...");
       
          return;
      
      }
  }

module.exports = {
    agradecimentosChat,
  };

