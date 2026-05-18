// =============================================
//  js/services/cotacaoAPI.js
//  Consumo da API de câmbio (AwesomeAPI)
//  Endpoint: https://economia.awesomeapi.com.br/json/last/USD-BRL
//  Gratuita, sem necessidade de chave de acesso
// =============================================

const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

/**
 * Busca a cotação atual do dólar em relação ao real.
 * @returns {Promise<number>} - Valor do dólar em BRL
 * @throws {Error} - Lança erro se a requisição falhar
 */
export async function buscarCotacaoDolar() {
  const resposta = await fetch(URL_API);

  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status} — ${resposta.statusText}`);
  }

  const dados = await resposta.json();
  const cotacao = parseFloat(dados.USDBRL.bid);

  if (!Number.isFinite(cotacao)) {
    throw new Error("Cotação retornada pela API é inválida.");
  }

  return cotacao;
}
