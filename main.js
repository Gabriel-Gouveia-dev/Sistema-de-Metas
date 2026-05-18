// =============================================
//  JS/main.js
//  Ponto de entrada — conecta todos os módulos
// =============================================

import { valorValido, aporteValido, prazoValido } from "./validacoes.js";
import { calcularTodas }                          from "./calculadora.js";
import { buscarCotacaoDolar }                     from "./cotacaoAPI.js";
import {
  renderizarCotacao,
  renderizarCards,
  renderizarTabela,
  renderizarResumo,
  renderizarFavoritos,
  renderizarBotaoSalvar,
  toggleResultados,
  definirSimulacaoAtual,
  exibirErro,
  limparErro,
  configurarBotaoLimparFavoritos,
} from "./render.js";

// =============================================
//  ESTADO GLOBAL DO MÓDULO
// =============================================

let cotacaoDolar = null;

// =============================================
//  INICIALIZAÇÃO
// =============================================

async function inicializar() {
  configurarBotaoLimparFavoritos();
  renderizarFavoritos();
  await carregarCotacao();
}

// =============================================
//  COTAÇÃO
// =============================================

async function carregarCotacao() {
  try {
    cotacaoDolar = await buscarCotacaoDolar();
    renderizarCotacao(cotacaoDolar);
  } catch (erro) {
    console.error("Falha ao buscar cotação:", erro.message);
    renderizarCotacao(null, true);
  }
}

// =============================================
//  LEITURA E VALIDAÇÃO DOS INPUTS
// =============================================

function lerInputs() {
  const valorInicial = parseFloat(document.getElementById("valorInicial").value);
  const aporteMensal = parseFloat(document.getElementById("aporteMensal").value) || 0;
  const prazo        = parseInt(document.getElementById("prazo").value);

  if (!valorValido(valorInicial)) {
    exibirErro("Informe um valor inicial válido e maior que zero.");
    return null;
  }

  if (!aporteValido(aporteMensal)) {
    exibirErro("O aporte mensal deve ser zero ou um número positivo.");
    return null;
  }

  if (!prazoValido(prazo)) {
    exibirErro("Informe um prazo entre 1 e 360 meses.");
    return null;
  }

  return { valorInicial, aporteMensal, prazo };
}

// =============================================
//  LIMPAR FORMULÁRIO
// =============================================

function limparFormulario() {
  document.getElementById("valorInicial").value = "";
  document.getElementById("aporteMensal").value = "";
  document.getElementById("prazo").value        = "";
}

// =============================================
//  EVENTOS
// =============================================

document.getElementById("btnSimular").addEventListener("click", () => {
  limparErro();
  toggleResultados(false);

  const inputs = lerInputs();
  if (!inputs) return;

  const { valorInicial, aporteMensal, prazo } = inputs;
  const resultados     = calcularTodas(valorInicial, aporteMensal, prazo);
  const totalInvestido = valorInicial + aporteMensal * prazo;

  definirSimulacaoAtual({ valorInicial, aporteMensal, prazo, resultados, cotacao: cotacaoDolar });

  renderizarResumo(totalInvestido, prazo);
  renderizarCards(resultados, cotacaoDolar);
  renderizarTabela(resultados, cotacaoDolar);
  renderizarBotaoSalvar();
  toggleResultados(true);

  document.getElementById("resultados").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("btnLimpar").addEventListener("click", () => {
  toggleResultados(false);
  limparFormulario();
  limparErro();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =============================================
//  TOGGLE DE TEMA
// =============================================

function inicializarTema() {
  const btn    = document.getElementById("btnTema");
  const icone  = document.getElementById("temaIcone");
  const label  = document.getElementById("temaLabel");

  const temaSalvo = localStorage.getItem("simulador:tema");
  if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
    icone.textContent = "☀️";
    label.textContent = "Tema escuro";
  }

  btn.addEventListener("click", () => {
    const claro = document.body.classList.toggle("tema-claro");
    icone.textContent = claro ? "☀️" : "🌙";
    label.textContent = claro ? "Tema escuro" : "Tema claro";
    localStorage.setItem("simulador:tema", claro ? "claro" : "escuro");
  });
}

// =============================================
//  START
// =============================================

inicializar();
inicializarTema();
