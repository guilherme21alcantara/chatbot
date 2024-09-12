
async function pixChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact) {
    const response = await manager.process('pt', message.body.toLowerCase());

    
    if (response.intent === 'px')  {
        
        if (!pedidosMap.has(senderName)) {
            pedidosMap.set(senderName, []);
          }
      
        
          let pedidos = pedidosMap.get(senderName);
          if (!Array.isArray(pedidos)) {
            pedidos = [pedidos]; 
          }
      
         
          if (!pedidos.includes(message.body)) {
            pedidos.push(message.body);
      
          
            pedidosMap.set(senderName, pedidos);
          }
      
          await chat.sendMessage(
            "Segue a chave pix: 484.479.748-47, nome: Mailza Santos Ramos"
          );
          await chat.sendMessage(
            "❗❗❗ Após efetuar o pagamento, favor encaminhar o comprovante do pix ❗❗❗"
          );
          await chat.sendMessage("Retirada ou entrega 🛵?");
       
          return;
      
      }
  }

module.exports = {
    pixChat,
  };

