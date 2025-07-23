# Documento de Requisitos Funcionais (FRD) Final - TaskFlow AI Minimal

**Product Name**: TaskFlow AI Minimal
**Document Owner**: Rafael
**Version**: 1.3
**Last Updated**: 22 de julho de 2025

---

## 1. Introdução Geral

### 1.1 Propósito
Este documento descreve os requisitos funcionais e não funcionais do TaskFlow AI Minimal, uma ferramenta de gerenciamento de tarefas com inteligência artificial. Ele detalha as funcionalidades que o sistema deve executar para atender aos objetivos de negócio e às necessidades dos usuários, conforme definido no PRD.

### 1.2 Escopo
O escopo deste FRD abrange as funcionalidades do MVP (Minimum Viable Product), incluindo o CRUD básico de tarefas, a sugestão automática de prioridade via IA, o dashboard simples e o sistema de notificações, bem como as especificações técnicas e de orquestração para frontend e backend.

### 1.3 Glossário
* **CRUD**: Create, Read, Update, Delete (Criar, Ler, Atualizar, Excluir).
* **IA**: Inteligência Artificial.
* **MVP**: Minimum Viable Product (Produto Mínimo Viável).
* **PRD**: Product Requirements Document (Documento de Requisitos do Produto).
* **FRD**: Functional Requirements Document (Documento de Requisitos Funcionais).
* **NPS**: Net Promoter Score.
* **API**: Application Programming Interface (Interface de Programação de Aplicações).
* **OWASP Top 10:2021**: Lista dos 10 riscos de segurança mais críticos para aplicações web.

---

## 2. Stack Tecnológica Detalhada

### 2.1 Stack Tecnológica do Frontend
* **Framework**: Next.js (para renderização React no lado do cliente e otimizações). [cite: 4.1]
* **Linguagem**: TypeScript (para tipagem estática e melhor manutenibilidade). [cite: 4.1]
* **Estilização**: Tailwind CSS (para utilitários CSS rápidos e responsivos). [cite: 4.1]

### 2.2 Stack Tecnológica do Backend
* **Plataforma**: API Routes do Next.js (para endpoints de API). [cite: 4.1]
* **Linguagem**: TypeScript (para tipagem estática e melhor manutenibilidade). [cite: 4.1]
* **Banco de Dados**: SQLite (para prototipagem/MVP). [cite: 4.1]
* **ORM**: Prisma ORM (para interação com o banco de dados). [cite: 4.1]
* **IA Externa**: OpenAI API (GPT-4.0-mini ou modelo similar via API). [cite: 4.1]
* **Deploy**: Docker containerizado. [cite: 4.1]

---

## 3. Requisitos Funcionais Detalhados

### 3.1 Módulo de Autenticação e Gerenciamento de Usuário (UI - Frontend)

#### 3.1.1 FRF007: Interface de Login
* **Descrição**: A interface deve permitir ao usuário fazer login no sistema.
* **Regras de Negócio**: Campos para e-mail/usuário e senha, botão de login, link para registro/recuperação de senha.
* **Prioridade**: Alta.
* **Mockup/Wireframe (Exemplo)**: Tela de login padrão.

#### 3.1.2 FRF008: Interface de Registro (Opcional, se aplicável ao MVP)
* **Descrição**: A interface deve permitir ao usuário criar uma nova conta.
* **Regras de Negócio**: Campos para e-mail, senha, confirmação de senha, botão de registro.
* **Prioridade**: Média.

#### 3.1.3 FRF009: Gerenciamento de Sessão (Logout)
* **Descrição**: A interface deve permitir ao usuário fazer logout do sistema.
* **Regras de Negócio**: Botão de logout acessível no dashboard/menu, que encerra a sessão do usuário.
* **Prioridade**: Alta.

### 3.2 Módulo de Gerenciamento de Tarefas (UI - Frontend)

#### 3.2.1 FRF001: Interface de Criação de Tarefa
* **Descrição**: A interface deve permitir ao usuário inserir o título, descrição e prazo de uma nova tarefa.
* **Regras de Negócio**:
    * Campo de `título` (input de texto, obrigatório).
    * Campo de `descrição` (textarea, opcional).
    * Campo de `prazo` (seletor de data/hora, opcional).
    * Botão "Salvar Tarefa" que envia os dados para o Backend.
* **Prioridade**: Alta.
* **Mockup/Wireframe (Descrição)**: A tela deve apresentar um formulário com campos de texto para 'Título' e 'Descrição', um seletor de data e hora para 'Prazo', e um botão 'Salvar Tarefa'. Deve haver um indicador visual para campos obrigatórios. Após o preenchimento, a prioridade sugerida pela IA deve ser exibida e permitir ajuste manual antes do salvamento.

#### 3.2.2 FRF002: Exibição da Lista de Tarefas
* **Descrição**: A interface deve exibir uma lista clara e organizada das tarefas do usuário.
* **Regras de Negócio**:
    * Cada item da lista deve exibir o `título`, `descrição` (truncada, com opção de expandir), `prazo` e `status`.
    * A `prioridade` (alta, média, baixa) deve ser visualmente destacada (e.g., por cor, ícone).
    * As tarefas devem ser agrupadas ou filtradas por `status` (a fazer, em andamento, concluídas) de forma acessível na UI.
* **Prioridade**: Alta.
* **Mockup/Wireframe (Exemplo)**: Dashboard principal com seções ou abas para "A Fazer", "Em Andamento" e "Concluídas".

#### 3.2.3 FRF003: Interface de Edição de Tarefa
* **Descrição**: A interface deve permitir que o usuário edite os detalhes de uma tarefa existente.
* **Regras de Negócio**:
    * Os campos `título`, `descrição` e `prazo` devem ser editáveis.
    * Deve haver um seletor para alterar o `status` da tarefa.
    * Deve ser possível ajustar manualmente a `prioridade` sugerida pela IA.
    * Botão "Atualizar Tarefa" para salvar as alterações.
* **Prioridade**: Alta.
* **Mockup/Wireframe (Exemplo)**: Tela de edição de tarefa, acessível ao clicar em uma tarefa na lista.

#### 3.2.4 FRF004: Interface de Exclusão de Tarefa
* **Descrição**: A interface deve permitir ao usuário excluir uma tarefa existente.
* **Regras de Negócio**:
    * Botão "Excluir Tarefa" visível na tela de detalhes/edição da tarefa.
    * Um modal de confirmação visualmente claro deve aparecer antes da exclusão final.
* **Prioridade**: Média.
* **Mockup/Wireframe (Exemplo)**: Botão de exclusão com pop-up de confirmação.

### 3.3 Módulo de Dashboard (UI - Frontend)

#### 3.3.1 FRF005: Visualização do Dashboard
* **Descrição**: A interface deve apresentar um dashboard simples e intuitivo para uma visão geral das tarefas.
* **Regras de Negócio**:
    * Exibir tarefas organizadas por `status` (a fazer, em andamento, concluídas).
    * A `prioridade` de cada tarefa deve ser visualmente destacada.
    * O layout deve ser responsivo e otimizado para dispositivos móveis (Mobile First).
* **Prioridade**: Alta.
* **Mockup/Wireframe (Exemplo)**: Dashboard principal com seções ou abas para "A Fazer", "Em Andamento" e "Concluídas".

### 3.4 Módulo de Notificações (UI - Frontend)

#### 3.4.1 FRF006: Exibição de Notificações Push
* **Descrição**: A interface deve exibir notificações push no aplicativo para prazos de tarefas iminentes.
* **Regras de Negócio**:
    * As notificações devem ser exibidas de forma não intrusiva (e.g., banner temporário, pop-up discreto).
    * A notificação deve incluir o `título` da tarefa e o `prazo`.
    * Deve ser possível fechar ou interagir com a notificação.
* **Prioridade**: Média.
* **Mockup/Wireframe (Exemplo)**: Pop-up de notificação no aplicativo ou banner de notificação.

### 3.5 Módulo de Feedback e Erros (UI - Frontend)

#### 3.5.1 FRF010: Exibição de Mensagens de Erro
* **Descrição**: A interface deve exibir mensagens de erro claras e informativas para o usuário.
* **Regras de Negócio**:
    * Erros de validação de formulário devem ser exibidos próximos ao campo relevante.
    * Erros de comunicação com o backend (e.g., falha de rede, erro do servidor) devem ser exibidos em um banner ou modal não bloqueante.
    * As mensagens devem ser compreensíveis e, quando possível, sugerir uma ação corretiva.
* **Prioridade**: Alta.

#### 3.5.2 FRF011: Indicadores de Carregamento
* **Descrição**: A interface deve exibir indicadores visuais de carregamento durante operações assíncronas.
* **Regras de Negócio**:
    * Spinners ou barras de progresso devem ser exibidos ao salvar/atualizar tarefas, carregar listas, etc.
    * Os indicadores devem ser removidos após a conclusão da operação ou em caso de erro.
* **Prioridade**: Média.

### 3.6 Módulo de Gerenciamento de Tarefas (API - Backend)

#### 3.6.1 RFB001: API para Criação de Tarefa
* **Descrição**: O backend deve fornecer um endpoint API para criar uma nova tarefa.
* **Método**: `POST /api/tasks`
* **Corpo da Requisição**:
    * `title`: string (obrigatório)
    * `description`: string (opcional)
    * `dueDate`: string (formato ISO 8601, opcional)
* **Resposta**: Objeto da tarefa criada, incluindo `id` e `priority` sugerida pela IA.
* **Regras de Negócio**:
    * Validar a presença do `title`.
    * Persistir a tarefa no banco de dados.
    * Acionar a sugestão de prioridade via IA antes de salvar.
* **Prioridade**: Alta.

#### 3.6.2 RFB002: API para Leitura de Tarefas
* **Descrição**: O backend deve fornecer um endpoint API para recuperar as tarefas do usuário.
* **Método**: `GET /api/tasks`
* **Parâmetros de Query (Opcional)**:
    * `status`: string (e.g., "todo", "in-progress", "completed")
* **Resposta**: Array de objetos de tarefas.
* **Regras de Negócio**:
    * Filtrar tarefas por `status` se o parâmetro for fornecido.
    * Retornar todas as tarefas do usuário autenticado por padrão.
* **Prioridade**: Alta.

#### 3.6.3 RFB003: API para Atualização de Tarefa
* **Descrição**: O backend deve fornecer um endpoint API para atualizar uma tarefa existente.
* **Método**: `PUT /api/tasks/{id}`
* **Corpo da Requisição**:
    * `title`: string (opcional)
    * `description`: string (opcional)
    * `dueDate`: string (formato ISO 8601, opcional)
    * `status`: string (e.g., "todo", "in-progress", "completed", opcional)
    * `priority`: string (e.g., "high", "medium", "low", opcional - para ajuste manual)
* **Resposta**: Objeto da tarefa atualizada.
* **Regras de Negócio**:
    * Validar se a tarefa com `id` existe e pertence ao usuário autenticado.
    * Se `title`, `description` ou `dueDate` forem alterados, re-acionar a sugestão de prioridade via IA (a menos que `priority` seja explicitamente enviado).
* **Prioridade**: Alta.

#### 3.6.4 RFB004: API para Exclusão de Tarefa
* **Descrição**: O backend deve fornecer um endpoint API para excluir uma tarefa existente.
* **Método**: `DELETE /api/tasks/{id}`
* **Resposta**: Status de sucesso (e.g., 204 No Content).
* **Regras de Negócio**:
    * Validar se a tarefa com `id` existe e pertence ao usuário autenticado.
* **Prioridade**: Média.

### 3.7 Módulo de Inteligência Artificial (Integração Backend)

#### 3.7.1 RFB005: Integração com OpenAI API para Sugestão de Prioridade
* **Descrição**: O backend deve integrar-se com a OpenAI API para receber sugestões de prioridade para as tarefas.
* **Regras de Negócio**:
    * A requisição à OpenAI API deve ser feita com base no `título`, `descrição` e `prazo` da tarefa. [cite: 3.1]
    * O modelo a ser utilizado é **GPT-4.0-mini ou modelo similar via API**. [cite: 4.1]
    * O resultado da IA deve ser mapeado para as prioridades definidas (alta, média, baixa).
    * Deve haver tratamento de erros para falhas na comunicação com a API da OpenAI.
* **Prioridade**: Alta.

### 3.8 Módulo de Notificações (Lógica Backend)

#### 3.8.1 RFB006: Lógica de Acionamento de Notificações
* **Descrição**: O backend deve ter uma lógica para identificar tarefas com prazos iminentes e acionar as notificações.
* **Regras de Negócio**:
    * Um processo (e.g., cron job, worker) deve verificar periodicamente as tarefas com prazos próximos.
    * A notificação deve ser acionada um período configurável antes do prazo (e.g., 24 horas, 1 hora).
    * A notificação deve conter o `título` da tarefa e o `prazo`.
    * A notificação deve ser enviada para o frontend (e.g., via WebSockets ou mecanismo de push).
* **Prioridade**: Média.

---

## 4. Requisitos Não Funcionais

### 4.1 Usabilidade e UX (Frontend)

* **NFRF001**: A interface deve seguir as diretrizes do **Material Design do Google** para uma experiência moderna, intuitiva e consistente. [cite: 5.1]

* **NFRF002**: O design e o desenvolvimento devem ser **Mobile First**, garantindo uma experiência fluida e otimizada em smartphones e tablets antes de adaptar para telas maiores. [cite: 5.2]

* **NFRF003**: A interface deve ser **limpa e mínima**, com fluxos de trabalho simplificados para reduzir a curva de aprendizado e maximizar a eficiência do usuário. [cite: 5.3]

* **NFRF004**: O carregamento das páginas e dos componentes deve ser rápido, visando tempos de resposta abaixo de 500ms para a interação do usuário.

### 4.2 Desempenho (Frontend)

* **NFRF005**: O frontend deve ser otimizado para renderização rápida e eficiente, minimizando o uso de recursos do dispositivo do usuário.

### 4.3 Compatibilidade (Frontend)

* **NFRF006**: O frontend deve ser compatível com os navegadores web modernos (Chrome, Firefox, Safari, Edge) nas suas versões mais recentes.

### 4.4 Manutenibilidade (Frontend)

* **NFRF007**: O código-fonte do frontend deve ser modular, seguir padrões de componentes React/Next.js, ser bem documentado e testável.

### 4.5 Desempenho (Backend)

* **NFRB001**: O backend deve suportar até **50 usuários simultâneos**. [cite: 4.2]

* **NFRB002**: O tempo de resposta para a maioria das requisições API (CRUD de tarefas) deve ser **abaixo de 500ms**. [cite: 4.2]

* **NFRB003**: A integração com a OpenAI API deve ser otimizada para minimizar a latência na sugestão de prioridade.

### 4.6 Segurança (Backend)

* **NFRB004**: O backend deve implementar boas práticas para proteger os dados do usuário, garantindo que não sejam expostos indevidamente. [cite: 4.3]

* **NFRB005**: Dados sensíveis em trânsito (entre frontend e backend, e backend e OpenAI API) e em repouso (no banco de dados) devem ser **criptografados**. [cite: 4.3]

* **NFRB006**: O backend deve seguir as diretrizes da **OWASP Top 10:2021** para mitigar riscos comuns de segurança, como injeção, falhas de autenticação e configuração de segurança incorreta. [cite: 4.3]

* **NFRB007**: Deve haver um mecanismo de autenticação e autorização para garantir que apenas usuários logados e autorizados possam acessar e manipular suas próprias tarefas.

### 4.7 Escalabilidade (Backend)

* **NFRB008**: A arquitetura do backend, baseada em API Routes do Next.js e Docker, deve permitir futuras expansões para lidar com um volume maior de usuários e dados.

### 4.8 Manutenibilidade (Backend)

* **NFRB009**: O código-fonte do backend deve ser modular, seguir padrões de API RESTful, ser bem documentado e testável (unitários e de integração).

### 4.9 Confiabilidade (Backend)

* **NFRB010**: O backend deve ter mecanismos de tratamento de erros e logging para identificar e diagnosticar problemas rapidamente.

---

## 5. Dependências

### 5.1 Dependências do Frontend

* **DF001**: Conectividade e disponibilidade da API do Backend para todas as operações de dados.

* **DF002**: Bibliotecas e dependências do Next.js, React, TypeScript e Tailwind CSS.

### 5.2 Dependências do Backend

* **DB001**: Disponibilidade e estabilidade da **OpenAI API** (GPT-4.0-mini ou modelo similar via API) para a funcionalidade de sugestão automática de prioridade. [cite: 6.1]

* **DB002**: Disponibilidade de um ambiente de execução (provedor de nuvem ou servidor próprio) para os containers Docker. [cite: 6.1]

* **DB003**: Bibliotecas e dependências do Next.js, Prisma ORM e SQLite.

---

## 6. Configuração de Docker Compose Unificado

Para orquestrar o deploy do frontend e do backend juntos, o seguinte arquivo `docker-compose.yml` será utilizado:

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