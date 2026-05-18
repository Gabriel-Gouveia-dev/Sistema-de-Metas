# 🎯 Sistema de Metas Financeiras

Uma aplicação web desenvolvida para ajudar usuários a cadastrar, acompanhar e visualizar metas financeiras de forma simples, intuitiva e dinâmica.

O sistema permite definir objetivos financeiros, acompanhar o progresso em tempo real e calcular automaticamente quanto falta para atingir cada meta.

---

## 🚀 Tecnologias utilizadas

<div align="left">

* JavaScript ES6+
* HTML5
* CSS3
* localStorage
* API REST

</div>

---

# ✨ Funcionalidades

✅ Cadastro de metas financeiras
✅ Cálculo automático de progresso
✅ Estimativa de meses restantes para atingir a meta
✅ Barra de progresso animada
✅ Identificação automática de metas concluídas
✅ CRUD completo utilizando localStorage
✅ Integração com API de cotação USD/BRL
✅ Tema claro e escuro com persistência
✅ Validação completa de formulários
✅ Interface responsiva e dinâmica

---

# 🧠 Como funciona?

O usuário informa:

* Nome da meta
* Valor total desejado
* Valor já guardado
* Aporte mensal

A aplicação calcula automaticamente:

📈 Porcentagem concluída
💰 Valor restante
📅 Tempo estimado para alcançar o objetivo

---

# 📐 Fórmulas utilizadas

```js
meses_restantes = Math.ceil(
  (valor_meta - valor_guardado) / aporte_mensal
)

porcentagem = (valor_guardado / valor_meta) * 100
```

---

# 🌐 API utilizada

### AwesomeAPI — Cotação USD/BRL em tempo real

```bash
https://economia.awesomeapi.com.br/json/last/USD-BRL
```

✅ Gratuita
✅ Sem autenticação
✅ Atualização em tempo real

---

# 🗂 Estrutura do projeto

```bash
metas-financeiras/
├── index.html
├── style.css
└── JS/
    ├── main.js         # ponto de entrada
    ├── validacoes.js   # validação de inputs
    ├── formatacao.js   # formatação de valores
    ├── calculadora.js  # lógica de negócio
    ├── storage.js      # CRUD localStorage
    └── render.js       # manipulação do DOM
```

---

# ▶️ Como executar o projeto

Como o projeto utiliza módulos ES6 (`import/export`), ele precisa ser executado através de um servidor HTTP.

## Passo a passo:

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Abra a pasta no VS Code

# Execute utilizando o Live Server
```

Ou:

1. Abra o projeto no VS Code
2. Clique com botão direito no `index.html`
3. Selecione **"Open with Live Server"**

---

# 💡 Objetivo do projeto

Este projeto foi desenvolvido com foco em prática de:

* Manipulação de DOM
* Organização modular de código
* JavaScript moderno (ES6+)
* CRUD com localStorage
* Consumo de APIs
* Responsividade
* Estruturação de aplicações front-end

---

# 📌 Possíveis melhorias futuras

* Sistema de login
* Banco de dados real
* Dashboard financeiro
* Gráficos interativos
* Integração com back-end
* Exportação de relatórios

---

# 👨‍💻 Autor

Desenvolvido por Gabriel Gouveia
Sempre buscando evoluir e transformar ideias em projetos reais 🚀
