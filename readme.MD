# 1. Criar projeto
- npm init -y

# 2. Instalar dependência
- npm i express dotenv pg @prisma/client @prisma/adapter-pg
- npm i -D nodemon prisma

# 3. Ajustar package.json
- Adicionar: "type": "module"
- Adicionar: "main": "server.js"
- Adicionar dentro do script: "dev": "nodemon server.js"

# 5. Inicializar Prisma
- npx prisma init --datasource-provider postgresql

# 6. Configurar `.env`
- DATABASE_URL="postgresql://postgres:amods@localhost:7777/spotify_db"

# 7. Configurar schema.prisma
- crie suas tabelas

# 8. Gerar SQL
- npx prisma migrate dev --name init
- npx prisma generate

# 9. Semear dados no banco
- npx prisma db seed

# 10. Abrir Prisma Studio
- npx prisma studio

## Casos de erros

### Após alterar schema.prisma
- npx prisma migrate dev --name nome_da_alteracao (exemplo: adicionar_tabela_users)

### Banco inconsistente (⚠️ APAGA TUDO)
- npx prisma migrate reset

### Apenas popular dados
- npx prisma db seed
