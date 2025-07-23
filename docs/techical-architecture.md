# Arquitetura Técnica Básica - TaskFlow AI Minimal

**Product Name**: TaskFlow AI Minimal
**Document Owner**: Rafael
**Version**: 1.0
**Last Updated**: 22 de julho de 2025

---

## 1. Introdução

Este documento descreve a arquitetura técnica básica do sistema TaskFlow AI Minimal, detalhando seus principais componentes, as tecnologias utilizadas e como eles interagem para fornecer as funcionalidades definidas nos Requisitos Funcionais.

---

## 2. Visão Geral da Arquitetura

A arquitetura do TaskFlow AI Minimal segue um modelo **Cliente-Servidor (Client-Server)**, onde o Frontend (cliente) se comunica com o Backend (servidor) através de APIs RESTful. O Backend, por sua vez, interage com um banco de dados para persistência de dados e com um serviço externo de Inteligência Artificial para sugestão de prioridades. Todo o ambiente é orquestrado via Docker para facilitar o desenvolvimento e o deploy.

## 3. Componentes da Arquitetura

### 3.1 Frontend (Aplicação Cliente)

* **Tecnologias**: Next.js, React, TypeScript, Tailwind CSS.
* **Responsabilidades**:
    * Renderização da interface do usuário (UI) e gerenciamento da experiência do usuário (UX).
    * Coleta de entrada do usuário (criação, edição de tarefas).
    * Exibição de dados recebidos do Backend (listas de tarefas, prioridades, status).
    * Gerenciamento de estado da UI.
    * Consumo das APIs RESTful do Backend para todas as operações de dados.
    * Exibição de notificações e mensagens de feedback/erro.
    * Implementação de design responsivo (Mobile First).

### 3.2 Backend (Serviço API)

* **Tecnologias**: Next.js API Routes, TypeScript, Prisma ORM.
* **Responsabilidades**:
    * Exposição de APIs RESTful para o Frontend (CRUD de tarefas).
    * Lógica de negócios principal (validação de dados, processamento de requisições).
    * Interação com o banco de dados para persistência e recuperação de dados.
    * Integração com o serviço de Inteligência Artificial (OpenAI API) para sugestão de prioridade.
    * Lógica de acionamento de notificações (identificação de prazos iminentes).
    * Autenticação e autorização de usuários (futuro, conforme PRD).
    * Tratamento de erros e logging.

### 3.3 Banco de Dados

* **Tecnologias**: SQLite (para MVP/prototipagem), Prisma ORM.
* **Responsabilidades**:
    * Armazenamento persistente de todas as informações das tarefas (título, descrição, prazo, status, prioridade).
    * Gerenciamento de esquemas (via Prisma Migrations).
* **Considerações**: Para o MVP, SQLite é suficiente. Para futuras fases e escala de produção, será necessária a migração para um banco de dados relacional mais robusto (e.g., PostgreSQL, MySQL).

### 3.4 Serviço de Inteligência Artificial (IA)

* **Tecnologias**: OpenAI API (GPT-4.0-mini ou modelo similar via API).
* **Responsabilidades**:
    * Receber dados da tarefa (título, descrição, prazo) do Backend.
    * Processar esses dados e retornar uma sugestão de prioridade (alta, média, baixa).
* **Integração**: O Backend faz chamadas HTTP para a API da OpenAI.

---

## 4. Fluxo de Comunicação (Exemplo: Criação de Tarefa)

1.  **Usuário -> Frontend**: O usuário preenche o formulário de "Nova Tarefa" no Frontend e clica em "Salvar".
2.  **Frontend -> Backend**: O Frontend envia uma requisição `POST` para o endpoint `/api/tasks` do Backend, contendo os dados da nova tarefa.
3.  **Backend -> IA Service**: O Backend recebe a requisição, valida os dados e, antes de salvar, faz uma chamada para a OpenAI API, enviando o título, descrição e prazo da tarefa.
4.  **IA Service -> Backend**: A OpenAI API processa a requisição e retorna uma sugestão de prioridade.
5.  **Backend -> Database**: O Backend recebe a prioridade da IA, persiste a nova tarefa (com a prioridade sugerida) no banco de dados via Prisma ORM.
6.  **Database -> Backend**: O banco de dados confirma a persistência e retorna os dados da tarefa salva.
7.  **Backend -> Frontend**: O Backend envia uma resposta de sucesso para o Frontend, incluindo os detalhes da tarefa recém-criada (com o ID e a prioridade final).
8.  **Frontend -> Usuário**: O Frontend atualiza a UI para exibir a nova tarefa na lista, com a prioridade correta, e pode exibir uma mensagem de sucesso.

---

## 5. Orquestração e Deploy (Docker Compose)

O ambiente de desenvolvimento e deploy será gerenciado por Docker e Docker Compose, permitindo que os serviços de Frontend, Backend e Banco de Dados rodem em contêineres isolados, mas interconectados.

### 5.1 Estrutura de Diretórios Esperada

```

.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── (código-fonte do backend Next.js)
└── frontend/
├── Dockerfile
└── (código-fonte do frontend Next.js)

````

### 5.2 `docker-compose.yml`

```yaml
version: '3.8'

services:
  # Serviço do Backend (API Routes do Next.js)
  backend:
    build:
      context: ./backend # Assumindo que o Dockerfile e o código do backend estão em uma pasta 'backend'
      dockerfile: Dockerfile
    ports:
      - "3001:3001" # Porta onde o Next.js (API Routes) será exposto. Usando 3001 para evitar conflito com o frontend.
    volumes:
      - ./backend:/app # Mapeia o diretório do backend para /app dentro do container
      - /app/node_modules # Garante que node_modules não seja sobrescrito pelo volume
    environment:
      NODE_ENV: development
      DATABASE_URL: file:./dev.db # Caminho para o banco de dados SQLite dentro do container do backend
      OPENAI_API_KEY: ${OPENAI_API_KEY} # Chave da API OpenAI (definida no .env do host)
    depends_on:
      - db # O backend depende do serviço de banco de dados
    command: sh -c "npx prisma migrate dev --name init && npm run dev -- -p 3001" # Executa migrações e inicia o servidor de desenvolvimento na porta 3001

  # Serviço do Frontend (Aplicação Next.js)
  frontend:
    build:
      context: ./frontend # Assumindo que o Dockerfile e o código do frontend estão em uma pasta 'frontend'
      dockerfile: Dockerfile
    ports:
      - "3000:3000" # Porta onde o Next.js (frontend) será exposto (padrão 3000)
    volumes:
      - ./frontend:/app # Mapeia o diretório do frontend para /app dentro do container
      - /app/node_modules # Garante que node_modules não seja sobrescrito pelo volume
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_BACKEND_URL: http://backend:3001 # URL do backend acessível de dentro da rede Docker
    depends_on:
      - backend # O frontend depende do backend para as chamadas de API
    command: npm run dev # Inicia o servidor de desenvolvimento do Next.js

  # Serviço do Banco de Dados SQLite
  db:
    image: nouchka/sqlite3:latest # Imagem Docker para o SQLite
    volumes:
      - sqlite_data:/var/lib/sqlite # Persiste os dados do SQLite
    environment:
      SQLITE_DATABASE: dev.db # Nome do arquivo do banco de dados SQLite

volumes:
  sqlite_data: # Volume para persistir os dados do SQLite
````

-----

## 6\. Considerações de Escalabilidade e Resiliência (MVP)

  * **Escalabilidade**: Para o MVP, a arquitetura é dimensionada para suportar até 50 usuários simultâneos. A modularidade dos serviços (Frontend, Backend, DB) facilita a escalabilidade horizontal de cada componente em um ambiente de produção mais avançado.
  * **Resiliência**: A dependência da OpenAI API é mitigada pela possibilidade de integração com outros modelos de IA via API, conforme definido no PRD. O uso de Docker e volumes persistentes para o DB garante que os dados não sejam perdidos em caso de reinício de contêineres.

-----

## 7\. Próximos Passos na Arquitetura

  * Definição de um provedor de nuvem para deploy em produção.
  * Implementação de autenticação e autorização de usuários (Firebase Auth, JWT, etc.).
  * Avaliação de um banco de dados relacional para produção (PostgreSQL, MySQL) e estratégia de migração.
  * Estratégia de monitoramento e logging em produção.
  * Implementação de WebSockets para notificações em tempo real.


