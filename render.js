// =============================================
//  JS/render.js
//  Funções de renderização do DOM
// =============================================

import { formatarMoeda, formatarDolar, formatarPorcentagem } from "./formatacao.js";
import { salvarFavorito, removerFavorito, lerFavoritos, limparFavoritos } from "./favoritos.js";

let simulacaoAtual = null;

// =============================================
//  UTILITÁRIO INTERNO
// =============================================

function melhorMontante(resultados) {
  return Math.max(...resultados.map(r => r.montante));
}

// =============================================
//  COTAÇÃO
// =============================================

export function renderizarCotacao(cotacao, erro = false) {
  const valorEl  = document.getElementById("cotacaoValor");
  const statusEl = document.getElementById("cotacaoStatus");

  if (erro) {
    valorEl.textContent  = "indisponível";
    statusEl.textContent = "API offline";
    statusEl.className   = "cotacao-status erro";
    return;
  }

  valorEl.textContent  = `R$ ${cotacao.toFixed(4)}`;
  statusEl.textContent = "ao vivo";
  statusEl.className   = "cotacao-status ativo";
}

// =============================================
//  RESULTADOS
// =============================================

export function renderizarCards(resultados, cotacao) {
  const melhor    = melhorMontante(resultados);
  const container = document.getElementById("cardsGrid");
  container.innerHTML = "";

  resultados.forEach(({ nome, taxaAnual, montante, rendimento }) => {
    const ehMelhor    = montante === melhor;
    const montanteUSD = cotacao ? montante / cotacao : null;
    const card        = document.createElement("article");

    card.className = ehMelhor ? "card melhor" : "card";
    card.innerHTML = `
      ${ehMelhor ? '<span class="card-badge">✦ Melhor rendimento</span>' : ""}
      <p class="card-nome">${nome}</p>
      <p class="card-taxa">${formatarPorcentagem(taxaAnual)}</p>
      <p class="card-montante-label">Montante final</p>
      <p class="card-montante-valor">${formatarMoeda(montante)}</p>
      ${montanteUSD ? `<p class="card-montante-usd">${formatarDolar(montanteUSD)} hoje</p>` : ""}
      <p class="card-rendimento-label">Rendimento</p>
      <p class="card-rendimento-valor">+ ${formatarMoeda(rendimento)}</p>
    `;

    container.appendChild(card);
  });
}

export function renderizarTabela(resultados, cotacao) {
  const melhor = melhorMontante(resultados);
  const tbody  = document.getElementById("tabelaBody");
  tbody.innerHTML = "";

  resultados.forEach(({ nome, taxaAnual, montante, rendimento, totalInvestido }) => {
    const ehMelhor    = montante === melhor;
    const montanteUSD = cotacao ? formatarDolar(montante / cotacao) : "—";
    const tr          = document.createElement("tr");

    tr.innerHTML = `
      <td class="nome-modalidade">${nome}</td>
      <td>${formatarPorcentagem(taxaAnual)}</td>
      <td>${formatarMoeda(totalInvestido)}</td>
      <td class="${ehMelhor ? "destaque" : ""}">+ ${formatarMoeda(rendimento)}</td>
      <td class="${ehMelhor ? "destaque" : ""}">${formatarMoeda(montante)}</td>
      <td class="coluna-usd">${montanteUSD}</td>
    `;

    tbody.appendChild(tr);
  });
}

export function renderizarResumo(totalInvestido, prazo) {
  document.getElementById("resumoInvestido").textContent =
    `Total investido: ${formatarMoeda(totalInvestido)} ao longo de ${prazo} meses`;
}

export function toggleResultados(visivel) {
  document.getElementById("resultados").hidden = !visivel;
}

export function definirSimulacaoAtual(dados) {
  simulacaoAtual = dados;
}

// =============================================
//  FAVORITOS
// =============================================

export function renderizarFavoritos() {
  const favoritos = lerFavoritos();
  const lista     = document.getElementById("favoritosLista");
  const vazio     = document.getElementById("favoritosVazio");

  lista.innerHTML = "";

  if (favoritos.length === 0) {
    vazio.hidden = false;
    return;
  }

  vazio.hidden = true;

  favoritos.forEach(fav => {
    const melhor         = melhorMontante(fav.resultados);
    const melhorResultado = fav.resultados.find(r => r.montante === melhor);
    const card           = document.createElement("article");

    card.className = "fav-card";
    card.innerHTML = `
      <div class="fav-card-header">
        <div>
          <p class="fav-data">Salvo em ${fav.dataSalva}</p>
          <p class="fav-params">
            ${formatarMoeda(fav.valorInicial)} inicial
            · ${formatarMoeda(fav.aporteMensal)}/mês
            · ${fav.prazo} meses
          </p>
        </div>
        <button class="btn-remover" data-id="${fav.id}" type="button" aria-label="Remover favorito">✕</button>
      </div>
      <div class="fav-destaque">
        <span class="fav-destaque-label">Melhor opção</span>
        <span class="fav-destaque-nome">${melhorResultado.nome}</span>
        <span class="fav-destaque-valor">${formatarMoeda(melhorResultado.montante)}</span>
        ${fav.cotacao ? `<span class="fav-destaque-usd">${formatarDolar(melhorResultado.montante / fav.cotacao)} na época</span>` : ""}
      </div>
    `;

    card.querySelector(".btn-remover").addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      removerFavorito(id);
      renderizarFavoritos();
    });

    lista.appendChild(card);
  });
}

export function renderizarBotaoSalvar() {
  const resultadosSection = document.getElementById("resultados");
  let btnSalvar = document.getElementById("btnSalvar");

  if (!btnSalvar) {
    btnSalvar           = document.createElement("button");
    btnSalvar.id        = "btnSalvar";
    btnSalvar.type      = "button";
    btnSalvar.className = "btn-salvar";
    btnSalvar.textContent = "Salvar simulação";
    resultadosSection.insertBefore(btnSalvar, document.getElementById("btnLimpar"));
  }

  btnSalvar.onclick = () => {
    if (!simulacaoAtual) return;
    salvarFavorito(simulacaoAtual);
    renderizarFavoritos();
    btnSalvar.textContent = "✓ Salvo!";
    btnSalvar.disabled    = true;
    setTimeout(() => {
      btnSalvar.textContent = "Salvar simulação";
      btnSalvar.disabled    = false;
    }, 2000);
  };
}

// =============================================
//  ERROS
// =============================================

export function exibirErro(mensagem) {
  document.getElementById("erroMsg").textContent = mensagem;
}

export function limparErro() {
  document.getElementById("erroMsg").textContent = "";
}

// =============================================
//  BOTÃO LIMPAR FAVORITOS
// =============================================

export function configurarBotaoLimparFavoritos() {
  document.getElementById("btnLimparFavoritos").addEventListener("click", () => {
    limparFavoritos();
    renderizarFavoritos();
  });
}
