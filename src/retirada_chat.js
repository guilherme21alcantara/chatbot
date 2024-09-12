
async function retiradaChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact) {
    const response = await manager.process('pt', message.body.toLowerCase());

    
    if (response.intent === 'get')  {
        
        let pedidos = pedidosMap.get(senderName);
        if (!Array.isArray(pedidos)) {
          pedidos = [pedidos]; 
        }
    

        if (!pedidos.includes(message.body)) {
          pedidos.push(message.body);
    

          pedidosMap.set(senderName, pedidos);
        }
        await chat.sendMessage(
          "Perfeito! Estaremos preparando seu pedido e podera ser retirado em 10min no endereço:\n\nRua: Izilda Barbosa Bernardo,304 - Dignidade"
        );
        await chat.sendMessage("Tenha um ótimo dia e volte sempre!");
        return;
   
      }
  }

module.exports = {
    retiradaChat,
  };

