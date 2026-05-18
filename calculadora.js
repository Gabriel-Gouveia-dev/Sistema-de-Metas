// =============================================
//  JS/calculadora.js
//  Lógica de cálculo de investimentos
// =============================================

import { modalidades } from "./modalidades.js";

/**
 * Calcula o montante final com juros compostos e aportes mensais.
 * Fórmula: M = PV * (1 + i)^n + PMT * [((1 + i)^n - 1) / i]
 *
 * @param {number} valorInicial  - Valor aplicado no início
 * @param {number} aporteMensal  - Valor aplicado todo mês
 * @param {number} taxaAnual     - Taxa anual (ex: 0.10 para 10%)
 * @param {number} prazoMeses    - Duração em meses
 * @returns {{ montante: number, rendimento: number, totalInvestido: number }}
 */
function calcularMontante(valorInicial, aporteMensal, taxaAnual, prazoMeses) {
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  const montanteInicial = valorInicial * Math.pow(1 + taxaMensal, prazoMeses);
  const montanteAportes = aporteMensal * ((Math.pow(1 + taxaMensal, prazoMeses) - 1) / taxaMensal);
  const montante        = montanteInicial + montanteAportes;

  const totalInvestido = valorInicial + aporteMensal * prazoMeses;
  const rendimento     = montante - totalInvestido;

  return { montante, rendimento, totalInvestido };
}

/**
 * Roda o cálculo para todas as modalidades.
 * @param {number} valorInicial
 * @param {number} aporteMensal
 * @param {number} prazo
 * @returns {Array}
 */
export function calcularTodas(valorInicial, aporteMensal, prazo) {
  return modalidades.map(({ nome, taxaAnual }) => {
    const { montante, rendimento, totalInvestido } = calcularMontante(
      valorInicial,
      aporteMensal,
      taxaAnual,
      prazo
    );
    return { nome, taxaAnual, montante, rendimento, totalInvestido };
  });
}
