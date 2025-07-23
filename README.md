# TaskFlow AI Minimal

TaskFlow AI Minimal é uma ferramenta de gerenciamento de tarefas com inteligência artificial, projetada para ajudar usuários a organizar, priorizar e concluir suas tarefas diárias de forma mais eficiente.

## 🚀 Recursos

- ✅ CRUD de Tarefas (Criar, Ler, Atualizar, Excluir)
- 🤖 Sugestão automática de prioridade via IA (OpenAI)
- 📊 Dashboard simples e intuitivo
- 🔔 Notificações para prazos próximos
- 📱 Design responsivo (mobile-first)
- 🔒 Autenticação segura
- 🐳 Containerizado com Docker

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **IA**: OpenAI API (GPT-4.0-mini)
- **Autenticação**: NextAuth.js
- **Containerização**: Docker

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker e Docker Compose (opcional, para execução em container)
- Conta na [OpenAI](https://platform.openai.com/) (para a API de IA)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/rafaelszp/taskflow-ai-minimal.git
   cd taskflow-ai-minimal
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
   Edite o arquivo `.env.local` com suas configurações.

4. Inicie o banco de dados e a aplicação:
   ```bash
   # Desenvolvimento
   npm run dev
   
   # Ou com Docker
   docker-compose up --build
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🛠️ Comandos úteis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npx prisma studio` - Abre o Prisma Studio para gerenciar o banco de dados
- `docker-compose up --build` - Inicia a aplicação com Docker

## 📦 Estrutura do Projeto

```
taskflow-ai-minimal/
├── src/
│   ├── app/                 # Rotas da aplicação (App Router)
│   ├── components/          # Componentes React reutilizáveis
│   ├── lib/                 # Utilitários e configurações
│   ├── prisma/              # Schema e migrações do Prisma
│   └── styles/              # Estilos globais
├── public/                  # Arquivos estáticos
├── .env.example             # Exemplo de variáveis de ambiente
├── docker-compose.yml       # Configuração do Docker Compose
├── Dockerfile               # Configuração do Docker
├── next.config.js           # Configuração do Next.js
├── package.json             # Dependências e scripts
├── prisma/                  # Configuração do Prisma
└── README.md                # Este arquivo
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça o push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido com ❤️ por Rafael
