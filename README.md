# StudyPDF AI — Converse com seus documentos

Aplicação fullstack que permite fazer upload de um PDF e interagir com ele via chat inteligente, utilizando a API do Google Gemini para gerar resumos, flashcards, quizzes e responder perguntas sobre o conteúdo do documento.

🔗 _[link do deploy]_

---

## 🛠️ Tech Stack

### Frontend

| Tecnologia         | Uso                                 |
| ------------------ | ----------------------------------- |
| React + TypeScript | Componentização e tipagem estática  |
| Tailwind CSS       | Estilização utilitária              |
| Vite               | Bundler e dev server                |
| React Router       | Navegação entre páginas             |
| pdfjs-dist         | Extração de texto do PDF no browser |

### Backend

| Tecnologia        | Uso                                    |
| ----------------- | -------------------------------------- |
| Node.js + Express | Servidor HTTP e roteamento             |
| @google/genai     | Integração com a API do Google Gemini  |
| dotenv            | Gerenciamento de variáveis de ambiente |
| TypeScript        | Tipagem estática no backend            |
| CORS              | Controle de acesso entre origens       |

---

## ✨ Funcionalidades

- 📄 **Upload de PDF** com drag and drop ou seleção manual
- 🔍 **Extração de texto** do documento via `pdfjs-dist`
- 💬 **Chat inteligente** com contexto do documento
- ⚡ **Ações rápidas** para resumo, flashcards e quiz
- 📋 **Sidebar** com informações do documento (nome, tamanho, número de páginas)
- 🤖 **Integração com Google Gemini** via backend seguro
- ⚠️ **Tratamento visual de erros** em todo o fluxo

---

## 🏗️ Arquitetura

O projeto é organizado como **monorepo**, com frontend e backend separados:

```
studyPDF/
├── client/          # React + TypeScript (frontend)
│   └── src/
│       ├── app/components/
│       ├── context/
│       ├── features/
│       ├── hooks/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── types/
└── server/          # Node.js + Express (backend)
    └── src/
        ├── controllers/
        ├── routes/
        └── services/
```

A separação entre client e server garante que a **API key do Gemini nunca seja exposta no frontend**.

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Chave de API do [Google AI Studio](https://aistudio.google.com/)

### Frontend

```bash
# Acesse a pasta do client
cd client

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Backend

```bash
# Acesse a pasta do server
cd server

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
# Adicione sua GEMINI_API_KEY no arquivo .env

# Inicie o servidor
npm run dev
```

O servidor roda em `http://localhost:3000`.

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server/` com o seguinte conteúdo:

```env
GEMINI_API_KEY=sua_chave_aqui
```

> ⚠️ Nunca suba o arquivo `.env` para o repositório. Ele já está no `.gitignore`.

---

## 📬 Contato

- LinkedIn: [linkedin.com/in/gustavo-savi](https://linkedin.com/in/gustavo-savi)
- Email: gutosavi@hotmail.com

---

## 📄 Licença

Distribuído sob a licença MIT.
