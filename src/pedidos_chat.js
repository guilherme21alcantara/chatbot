
async function pedidosRealizados(message, chat, senderName,pedidosMap,userTimeouts, manager) {
    const response = await manager.process('pt', message.body.toLowerCase());
  
    if (response.intent === 'pedidos') 
     {
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
        pedidosMap.set(senderName, pedidos);
      }
      let existePagamento = pedidosMap.get(senderName).some(item => item && item.includes('vou pagar'));
      let existePix = pedidosMap.get(senderName).some(item => item && item.includes('pix'));
      if(existePix)
        {
          await chat.sendMessage(
            "Segue a chave pix: 484.479.748-47, nome: Mailza Santos Ramos"
          );
          await chat.sendMessage(
            "❗❗❗ Após efetuar o pagamento, favor encaminhar o comprovante do pix ❗❗❗"
          );
          await chat.sendMessage("Retirada ou entrega 🛵?");
        }else 
        {
          if(existePagamento)
            {
              await chat.sendMessage(
                "Seu pedido foi anotado com sucesso ✍️\n\nPor gentileza, poderia informar:\nEntrega ou retirada?"
              );
            }else 
            {
              await chat.sendMessage(
                "Seu pedido foi anotado com sucesso ✍️\n\nPor gentileza, poderia informar:\nForma de pagamento 💵?"
              );
            }
        }
      
      
  
      return;
    }
    else if(response.intent === 'alteracao')
        {
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
                "Anotado com sucesso 😃!"
              );
              await chat.sendMessage(
                "Por gentileza, poderia informar:\nForma de pagamento 💵?"
              );
          
              return;
        }
  
  }

module.exports = {
    pedidosRealizados,
  };