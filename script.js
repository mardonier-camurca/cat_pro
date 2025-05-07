// Array de produtos
const produtos = [
    {
        id: 1,
        nome: "Smartphone Galaxy S23",
        descricao: "Smartphone com tela AMOLED de 6.1 polegadas, 8GB RAM, 128GB armazenamento.",
        preco: 4999.99,
        precoOriginal: 4999.99,
        temDesconto: false
    },
    {
        id: 2,
        nome: "Notebook Ultrabook Pro",
        descricao: "Notebook com processador Intel i7, 16GB RAM, 512GB SSD, tela Full HD de 15.6 polegadas.",
        preco: 6499.90,
        precoOriginal: 6499.90,
        temDesconto: false
    },
    {
        id: 3,
        nome: "Smart TV 4K 55\"",
        descricao: "Smart TV com resolução 4K, 55 polegadas, HDR, sistema operacional webOS.",
        preco: 3299.00,
        precoOriginal: 3299.00,
        temDesconto: false
    },
    {
        id: 4,
        nome: "Fone de Ouvido Bluetooth",
        descricao: "Fone de ouvido sem fio com cancelamento de ruído, bateria de longa duração.",
        preco: 899.90,
        precoOriginal: 899.90,
        temDesconto: false
    },
    {
        id: 5,
        nome: "Câmera DSLR Profissional",
        descricao: "Câmera DSLR com sensor de 24.2MP, gravação em 4K, Wi-Fi e Bluetooth integrados.",
        preco: 5899.00,
        precoOriginal: 5899.00,
        temDesconto: false
    }
];


function formataPreco(preco) {
  return preco.toLocaleString('pt-BR', 
  { 
    style: 'currency', 
    currency: 'BRL' 
  })
}

function renderizarProdutos() {
  const produtosContainer = document.getElementById('produtos');

  produtosContainer.innerHTML = '';

  const produtosHTML = produtos.map(produto => {
    const produtoCard = document.createElement('div');
    produtoCard.className = 'produto-card';

    const produtoInfo = document.createElement('div');
    produtoInfo.className = 'produto-info';

    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome';
    produtoNome.textContent = produto.nome

    const produtoDescricao = document.createElement('p');
    produtoDescricao.className = 'produto-descricao';
    produtoDescricao.textContent = produto.descricao

    const produtoPreco = document.createElement('div');
    produtoPreco.className = 'produto-preco';
    
    if (produto.temDesconto) {
      const precoOriginal = document.createElement('span');
      precoOriginal.className = 'preco-original';
      precoOriginal.textContent = formataPreco(produto.precoOriginal);

      const precoDesconto = document.createElement('span');
      precoDesconto.className = 'preco-desconto';
      precoDesconto.textContent = formataPreco(produto.preco);

      produtoPreco.appendChild(precoOriginal);
      produtoPreco.appendChild(precoDesconto);
    } else {
      produtoPreco.textContent = formataPreco(produto.preco);
    }
    produtoInfo.appendChild(produtoNome);
    produtoInfo.appendChild(produtoDescricao);
    produtoInfo.appendChild(produtoPreco);

    produtoCard.appendChild(produtoInfo);

    return produtoCard;
  });

  produtosHTML.forEach(card => {
    produtosContainer.appendChild(card);
  });

}

function aplicarDesconto() {
  produtos.forEach(produto => {
    if (!produto.temDesconto) {
      produto.precoOriginal = produto.preco;
      produto.preco = produto.preco * 0.9;
      produto.temDesconto = true;
    }
  });

  renderizarProdutos()
}

document.getElementById('aplicarDesconto').addEventListener('click', aplicarDesconto);

document.addEventListener('DOMContentLoaded',  renderizarProdutos);
