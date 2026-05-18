// =============================================
//  js/services/favoritos.js
//  Persistência de simulações favoritas via localStorage
// =============================================

const CHAVE_STORAGE = "simulador:favoritos";

/**
 * Lê todos os favoritos salvos no localStorage.
 * @returns {Array}
 */
export function lerFavoritos() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    console.error("Erro ao ler favoritos do localStorage.");
    return [];
  }
}

/**
 * Salva uma nova simulação nos favoritos.
 * @param {{ valorInicial: number, aporteMensal: number, prazo: number, resultados: Array, cotacao: number }} simulacao
 */
export function salvarFavorito(simulacao) {
  try {
    const favoritos = lerFavoritos();

    const novoFavorito = {
      id:           Date.now(),
      dataSalva:    new Date().toLocaleDateString("pt-BR"),
      valorInicial: simulacao.valorInicial,
      aporteMensal: simulacao.aporteMensal,
      prazo:        simulacao.prazo,
      cotacao:      simulacao.cotacao,
      resultados:   simulacao.resultados,
    };

    favoritos.push(novoFavorito);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(favoritos));
  } catch {
    console.error("Erro ao salvar favorito no localStorage.");
  }
}

/**
 * Remove um favorito pelo id.
 * @param {number} id
 */
export function removerFavorito(id) {
  try {
    const favoritos  = lerFavoritos();
    const atualizados = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizados));
  } catch {
    console.error("Erro ao remover favorito do localStorage.");
  }
}

/**
 * Remove todos os favoritos.
 */
export function limparFavoritos() {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
  } catch {
    console.error("Erro ao limpar favoritos do localStorage.");
  }
}
