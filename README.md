# 🐾 FURIA Know Your Fan

Projeto desenvolvido para o processo seletivo **FURIA Tech 2025**.  
O objetivo é criar uma solução para coletar, organizar e validar informações de fãs de e-sports, focando na experiência do torcedor da FURIA.

---

## 📌 Sobre o Projeto

**FURIA Know Your Fan** é uma plataforma web com integração de backend para cadastro, análise e listagem de fãs.

Funcionalidades principais:

- 📋 Coleta de dados básicos (Nome, CPF, Endereço, Interesses)
- 📂 Upload de documento com validação simulada
- 🌐 Integração de redes sociais (Instagram, Twitter, Twitch)
- 🧠 Análise de perfil com identificação de fãs de e-sports
- 📜 Resumo gerado após o cadastro
- 🖥️ Backend Node.js para salvar dados em `dados.json`

---

## 🎨 Layout

- Tema escuro inspirado na FURIA.
- Estilo responsivo para desktop e mobile.
- Animações suaves para feedback do usuário.

---

## 📂 Estrutura do Projeto

furia-know-your-fan/ ├── index.html # Página principal do formulário ├── sucesso.html # Página de confirmação de cadastro ├── informacoes.html # Página listando próximos jogos ├── style.css # Estilo geral ├── informacoes.css # Estilo da página de informações ├── script.js # Lógica do formulário (validação, envio) ├── informacoes.js # Script para carregar dados de jogos ├── server.js # Servidor Node.js com rotas de API ├── dados.json # Banco de dados local dos fãs ├── package.json # Configurações do Node.js ├── README.md # Documentação do projeto └── enviarDados.js # Script auxiliar para envio de dados automáticos

yaml
Copiar
Editar

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** – Estrutura de páginas
- **CSS3** – Estilização responsiva
- **JavaScript (ES6)** – Lógicas de validação e interatividade
- **Node.js + Express** – Backend para coleta e listagem de dados
- **VS Code + Live Server** – Ambiente de desenvolvimento

---

## 🚀 Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/davifeels/furia-know-your-fan.git
Entre na pasta do projeto:

bash
Copiar
Editar
cd furia-know-your-fan
Instale as dependências:

bash
Copiar
Editar
npm install
Rode o servidor:

bash
Copiar
Editar
node server.js
Abra index.html em um navegador para usar o formulário.


📜 Licença
Este projeto foi desenvolvido exclusivamente para fins educacionais e participação no processo seletivo da FURIA Tech 2025.

🏆 Autor
Feito com orgulho por Davi Ferreira 🐾

GitHub

🔥 "A FURIA não é só um time. É um sentimento."
