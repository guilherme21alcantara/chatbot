
async function pagamentoChat(message, chat, senderName,pedidosMap,userTimeouts, manager, contact) {
    const response = await manager.process('pt', message.body.toLowerCase());

    if (response.intent === 'card')  {
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
        let existeEntrega = pedidosMap.get(senderName).some(item => item && item.includes('Entrega'));
        if(existeEntrega)
        {
            if(!contact.isMyContact)
                {
                  await chat.sendMessage("Qual o Endereço para a entrega 🛵?");
                  await chat.sendMessage(
                    "Obs: Informe se é rua, avenida ou projetada por gentileza."
                  );}else{   await chat.sendMessage(
                    "Iremos preparar o seu pedido e logo estaremos te enviando.\n\nO tempo estimado para entrega é de 20 a 40 minutos.\n\nAgradecemos pela preferência!"
                  );
                  await chat.sendMessage("Tenha um ótimo dia e volte sempre!");}
        }
        else
        {
            await chat.sendMessage("Retirada ou entrega 🛵?");
        }       
        return;
      }
  
  }

module.exports = {
    pagamentoChat,
  };

