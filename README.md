# StudyPDF AI — Converse com seus documentos

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplicação fullstack que permite fazer upload de um PDF e interagir com ele via chat inteligente, utilizando a API do Google Gemini para gerar resumos, flashcards, quizzes e responder perguntas sobre o conteúdo do documento.

🔗 **[Link para o Deploy do Projeto Aqui]()**

---

## 📸 Demonstração - em produção

<p align="center">
  <img src="" alt="Demonstração do StudyPDF AI" width="100%">
</p>

---

## ✨ Funcionalidades

- 📄 **Upload de PDF** com suporte a drag and drop ou seleção manual.
- 🔍 **Extração de texto** eficiente do documento diretamente no navegador via `pdfjs-dist`.
- 💬 **Chat inteligente** com contexto do documento para responder perguntas.
- ⚡ **Ações rápidas** para gerar resumos, flashcards e quizzes.
- 📋 **Sidebar** com informações do documento (nome, tamanho e número de páginas).
- 🤖 **Integração com Google Gemini** por meio de um backend seguro.
- ⚠️ **Tratamento visual de erros** durante o fluxo da aplicação.

---

## 💡 Desafios Técnicos & Soluções

Durante o desenvolvimento do projeto, foquei em aplicar boas práticas de engenharia de software para resolver problemas reais de arquitetura e performance:

- **Otimização de banda e desempenho:** em vez de enviar o arquivo PDF a cada mensagem, o documento é processado apenas uma vez no frontend. O texto extraído é reutilizado durante toda a conversa, reduzindo o volume de dados enviados e melhorando o tempo de resposta.
- **Segurança da API Key:** a chave da API do Google Gemini permanece exclusivamente no backend, protegida por variáveis de ambiente.
- **Separação de responsabilidades:** a interface do chat permanece responsável apenas pela apresentação. A comunicação com a IA e a construção dos prompts são encapsuladas em serviços especializados e consumidas por meio de Custom Hooks e Context API.

---

## 🧠 Decisões de Engenharia

Além da implementação das funcionalidades, algumas decisões arquiteturais foram tomadas para tornar a aplicação mais eficiente, escalável e de fácil manutenção.

### 📄 Processamento do PDF no Frontend

O documento é processado apenas uma única vez utilizando `pdfjs-dist`. Em vez de enviar o arquivo PDF para o servidor a cada nova pergunta, apenas o texto extraído é utilizado durante a conversa.

**Benefícios:**

- Redução significativa do tráfego de dados.
- Menor tempo de resposta da aplicação.
- Melhor experiência para o usuário.

---

### 🔒 Backend como intermediário da IA

Toda a comunicação com o Google Gemini acontece através de uma API construída com Node.js e Express.

**Motivação:**

- Proteger a chave da API.
- Centralizar a lógica de comunicação com o modelo de IA.
- Permitir futuras evoluções, como autenticação, histórico de conversas e troca do provedor de IA sem impactar o frontend.

---

### ⚛️ Estado global com Context API

O gerenciamento do estado do chat foi centralizado utilizando React Context API.

**Objetivo:**

- Compartilhar mensagens, estados de carregamento e erros entre diferentes componentes.
- Evitar prop drilling.
- Manter a lógica do chat desacoplada da interface.

---

### 🧩 Separação de responsabilidades

A aplicação foi organizada seguindo o princípio da responsabilidade única (Single Responsibility Principle).

Cada camada possui uma função bem definida:

- **Componentes:** renderização da interface.
- **Custom Hooks:** gerenciamento da lógica do chat.
- **Services:** comunicação com APIs e serviços externos.
- **Context API:** gerenciamento do estado compartilhado.
- **Backend:** integração segura com o Google Gemini.

Essa organização facilita a manutenção, melhora a legibilidade do código e torna o projeto mais preparado para evolução.

---

## 🛠️ Tech Stack

### Frontend

| Tecnologia         | Utilização                                         |
| ------------------ | -------------------------------------------------- |
| React + TypeScript | Componentização, gerenciamento de estado e tipagem |
| Tailwind CSS       | Estilização e responsividade                       |
| Vite               | Build e ambiente de desenvolvimento                |
| React Router       | Navegação entre páginas                            |
| pdfjs-dist         | Extração de texto dos documentos PDF               |

### Backend

| Tecnologia        | Utilização                                  |
| ----------------- | ------------------------------------------- |
| Node.js + Express | Servidor HTTP e API                         |
| @google/genai     | Integração com o Google Gemini              |
| dotenv            | Gerenciamento de variáveis de ambiente      |
| TypeScript        | Tipagem estática                            |
| CORS              | Comunicação segura entre frontend e backend |

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma estrutura de **monorepo**, separando claramente as responsabilidades entre frontend e backend.

```text
studyPDF/
├── client/
│   └── src/
│       ├── app/components/
│       ├── assets/
│       ├── context/
│       ├── features/
│       ├── hooks/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── types/
│
└── server/
    └── src/
        ├── controllers/
        ├── routes/
        └── services/
```

---

## 🚀 Executando Localmente

### Pré-requisitos

Antes de iniciar, instale:

- Node.js 18 ou superior
- Uma chave gratuita da API do Google Gemini obtida no [Google AI Studio](https://aistudio.google.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/gustavo-savi/studyPDF.git

cd studyPDF
```

### 2. Configurando o Backend

```bash
cd server

npm install

cp .env.example .env
```

Abra o arquivo `.env` e configure:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Depois execute:

```bash
npm run dev
```

O backend estará disponível em:

```text
http://localhost:3000
```

### 3. Configurando o Frontend

Abra um novo terminal na raiz do projeto e execute:

```bash
cd client

npm install

npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## 🔐 Variáveis de Ambiente

O arquivo `.env` contém informações sensíveis e está listado no `.gitignore`.

Nunca compartilhe sua chave da API do Google Gemini em repositórios públicos.

---

## 📬 Contato

Caso tenha sugestões ou queira conversar sobre desenvolvimento de software:

- **LinkedIn:** https://linkedin.com/in/gustavo-savi
- **E-mail:** gutosavi@hotmail.com

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.
