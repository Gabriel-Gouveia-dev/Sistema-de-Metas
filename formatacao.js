// =============================================
//  js/utils/formatacao.js
//  Funções de formatação de valores
// =============================================

export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarDolar(valor) {
  return valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatarPorcentagem(taxaAnual) {
  return (taxaAnual * 100).toFixed(2) + "% a.a.";
}
