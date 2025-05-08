const URL_DO_SUPABASE = 'https://yxioievtilunojleuiob.supabase.co';
  const API_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aW9pZXZ0aWx1bm9qbGV1aW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDU5NTcsImV4cCI6MjA2MjI4MTk1N30.4yMPhs466nJ4-XltH1FZl1EhYyNpNzi834VuUGAi-Go';

const supabase = window.supabase.createClient(URL_DO_SUPABASE, API_KEY);

let produtos = [];

function formataPreco(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

async function renderizarProdutos() {
  const produtosContainer = document.getElementById("produtos");
  produtosContainer.innerHTML ="";

  try {
    const { data, error } = await supabase.from("produtos_").select("*");

    if (error) {
      console.error("Erro ao buscar produtos do Supabase:", error);
      produtosContainer.innerHTML = "<p>Erro ao carregar os produtos.</p>";
      return;
    }

    if (data) {
      produtos = data;
      const produtosHTML = produtos.map((produto) => {
        const produtoCard = document.createElement("div");
        produtoCard.className = "produto-card";

        const produtoInfo = document.createElement("div");
        produtoInfo.className = "produto-info";

        const produtoNome = document.createElement("h3");
        produtoNome.className = "produto-nome";
        produtoNome.textContent = produto.nome;

        const produtoDescricao = document.createElement("p");
        produtoDescricao.className = "produto-descricao";
        produtoDescricao.textContent = produto.descricao;

        const produtoPreco = document.createElement("div");
        produtoPreco.className = "produto-preco";

        if (produto.temdesconto) {
          const precoOriginal = document.createElement("span");
          precoOriginal.className = "preco-original";
          precoOriginal.textContent = formataPreco(produto.preco_original);

          const precoDesconto = document.createElement("span");
          precoDesconto.className = "preco-desconto";
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

      produtosHTML.forEach((card) => {
        produtosContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Ocorreu um erro inesperado:", error);
    produtosContainer.innerHTML =
      "<p>Ocorreu um erro ao carregar os produtos.</p>";
  }
}

async function aplicarDesconto() {
  const produtosComDescontoAtualizado = produtos.map(async (produto) => {
    if (!produto.temdesconto) {
      const novoPreco = produto.preco * 0.9;
      const { error } = await supabase
        .from("produtos")
        .update({
          preco: novoPreco,
          preco_original: produto.preco,
          temdesconto: true,
        })
        .eq("id", produto.id);

      if (error) {
        console.error(
          "Erro ao aplicar desconto no produto:",
          produto.nome,
          error
        );
        return produto;
      } else {
        return {
          ...produto,
          preco_original: produto.preco,
          preco: novoPreco,
          temdesconto: true,
        };
      }
    }
    return produto;
  });

  Promise.all(produtosComDescontoAtualizado).then((produtosAtualizados) => {
    produtos = produtosAtualizados.filter((p) => p);
    renderizarProdutos();
  });
}

document
  .getElementById("aplicarDesconto")
  .addEventListener("click", aplicarDesconto);

document.addEventListener("DOMContentLoaded", renderizarProdutos);
