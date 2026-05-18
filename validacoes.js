// =============================================
//  js/utils/validacoes.js
//  Funções de validação dos inputs do usuário
// =============================================

export function valorValido(valor) {
  return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
}

export function aporteValido(aporte) {
  return typeof aporte === "number" && Number.isFinite(aporte) && aporte >= 0;
}

export function prazoValido(prazo) {
  return typeof prazo === "number" && Number.isFinite(prazo) && prazo >= 1 && prazo <= 360;
}
