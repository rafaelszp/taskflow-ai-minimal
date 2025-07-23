# Etapa de construção
FROM node:18-slim AS base

# Instala as dependências do sistema necessárias para o Prisma
RUN apt-get update && apt-get install -y openssl

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm ci

# Instala as dependências adicionais necessárias
RUN npm install react-datepicker @types/react-datepicker date-fns

# Copia o restante do código-fonte
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Constrói a aplicação
RUN npm run build

# Etapa de produção
FROM node:18-slim AS runner
WORKDIR /app

# Instala as dependências do sistema necessárias para o Prisma
RUN apt-get update && apt-get install -y openssl

# Copia apenas os arquivos necessários para produção
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/next.config.js ./
COPY --from=base /app/src/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/prisma ./prisma

# Expõe a porta 3000
EXPOSE 3000

# Define o comando de inicialização
CMD ["node", "server.js"]
