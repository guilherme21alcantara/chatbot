
const { NlpManager } = require('node-nlp');

// Criar o gerenciador de NLP
const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adiciona frases de saudação ao modelo
manager.addDocument('pt', 'oie', 'saudacao');
manager.addDocument('pt', 'olá', 'saudacao');
manager.addDocument('pt', 'oi', 'saudacao');
manager.addDocument('pt', 'ola', 'saudacao');
manager.addDocument('pt', 'boa tarde', 'saudacao');
manager.addDocument('pt', 'bom dia', 'saudacao');
manager.addDocument('pt', 'boa', 'saudacao');
manager.addDocument('pt', 'opa', 'saudacao');
manager.addDocument('pt', 'paz Deus', 'ccb');
// Adiciona frases de pedido ao modelo
manager.addDocument('pt', 'grande', 'pedidos');
manager.addDocument('pt', 'media', 'pedidos');
manager.addDocument('pt', 'média', 'pedidos');
manager.addDocument('pt', 'mini', 'pedidos');
manager.addDocument('pt', 'pequena', 'pedidos');
manager.addDocument('pt', 'manda', 'pedidos');
manager.addDocument('pt', 'uma', 'pedidos');
manager.addDocument('pt', 'G', 'pedidos');
manager.addDocument('pt', 'M', 'pedidos');
manager.addDocument('pt', 'P', 'pedidos');

//Adiciona frase de alteracao ao pedido
manager.addDocument('pt', 'retira', 'alteracao');
manager.addDocument('pt', 'sem', 'alteracao');
manager.addDocument('pt', 'coloca', 'alteracao');
manager.addDocument('pt', 'tira', 'alteracao');
manager.addDocument('pt', 'quero', 'alteracao');
manager.addDocument('pt', 'adicional', 'alteracao');
manager.addDocument('pt', 'adicionar', 'alteracao');

//Adiciona frase de pagamento por cartao
manager.addDocument('pt', 'cartao', 'card');
manager.addDocument('pt', 'cartão', 'card');
manager.addDocument('pt', 'débito', 'card');
manager.addDocument('pt', 'debito', 'card');
manager.addDocument('pt', 'crédito', 'card');
manager.addDocument('pt', 'credito', 'card');
manager.addDocument('pt', 'máquina', 'card');
manager.addDocument('pt', 'maquina', 'card');
manager.addDocument('pt', 'maquininha', 'card');

// Adiciona frase para entrega
manager.addDocument('pt', 'entrega', 'send');
manager.addDocument('pt', 'entregar', 'send');

//Adiciona frase para retirada
manager.addDocument('pt', 'retirada', 'get');
manager.addDocument('pt', 'retirar', 'get');

//Adicionar abstenção 
manager.addDocument('pt', 'entregar uma', 'abst');
manager.addDocument('pt', 'entrega uma', 'abst');

//Adicionar frase para dinheiro
manager.addDocument('pt', 'dinheiro', 'money');

//Adicionar frase para troco
manager.addDocument('pt', 'troco', 'cash');
manager.addDocument('pt', 'para', 'cash');
manager.addDocument('pt', 'pra', 'cash');

//Adicionar frase para pix
manager.addDocument('pt', 'pix', 'px');

//Adicionar frase para agradecimento
manager.addDocument('pt', 'obrigado', 'agrad');
manager.addDocument('pt', 'obrigada', 'agrad');
manager.addDocument('pt', 'obg', 'agrad');
manager.addDocument('pt', 'brigado', 'agrad');
manager.addDocument('pt', 'ok', 'agrad');
manager.addDocument('pt', 'bele', 'agrad');
manager.addDocument('pt', 'bl', 'agrad');

//Adicionar frase para endereco
manager.addDocument('pt', 'rua', 'address');
manager.addDocument('pt', 'avenida', 'address');
manager.addDocument('pt', 'projetada', 'address');
manager.addDocument('pt', 'proj', 'address');
manager.addDocument('pt', 'av', 'address');


// Adiciona respostas
manager.addAnswer('pt', 'pedidos', 'funcionou bem 🍲🥗🍴');
manager.addAnswer('pt', 'saudacao', 'aweaea');

// Treina o modelo
(async () => {
  await manager.train();
  manager.save();
})();

module.exports = {
    manager,
  };