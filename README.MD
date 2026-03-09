# Desafio Jitterbit — API REST

API REST desenvolvida em Node.js + TypeScript com autenticação JWT, banco de dados PostgreSQL via Prisma e documentação Swagger.

---

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **Prisma 7** (ORM)
- **PostgreSQL 15**
- **JWT** (autenticação)
- **Zod** (validação de schemas)
- **Swagger UI** (documentação interativa)
- **Docker / Docker Compose**

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) e Docker Compose

---

## Configuração do ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis:

```env
# Aplicação
PORT=3000
NODE_ENV=development

# Banco de dados (usado pelo Docker e pelo Prisma)
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=1h
```

> **Atenção:** os valores de `DB_USER`, `DB_PASSWORD` e `DB_NAME` devem coincidir com os configurados no `docker-compose.yml`.

---

## Subindo o banco de dados

```bash
docker compose up -d
```

Isso inicia um container PostgreSQL 15 acessível em `localhost:5432`.

---

## Instalando dependências

```bash
npm install
```

---

## Rodando as migrations (criando as tabelas)

```bash
npx prisma migrate deploy
```

Ou, em ambiente de desenvolvimento (cria uma nova migration se houver alterações no schema):

```bash
npx prisma migrate dev
```

---

## Iniciando o servidor

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

---

## Documentação Swagger

Acesse a documentação interativa em:

```
http://localhost:3000/api-docs
```

---

## Endpoints

### Autenticação

> Rotas públicas — não exigem token.

#### `POST /auth/register` — Cadastrar usuário

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta 201:**
```json
{
  "id": "uuid",
  "email": "usuario@email.com"
}
```

---

#### `POST /auth/login` — Autenticar usuário

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Utilize o `token` retornado no header `Authorization` das rotas protegidas:
> ```
> Authorization: Bearer <token>
> ```

---

### Produtos

> Rotas protegidas — exigem token JWT.

#### `GET /product/:id` — Buscar produto por ID

Retorna um produto do catálogo fixo.

| ID   | Nome      | Preço    |
|------|-----------|----------|
| 2434 | Produto A | R$ 1000  |
| 2435 | Produto B | R$ 500   |
| 2436 | Produto C | R$ 2500  |

**Exemplo:** `GET /product/2434`

**Resposta 200:**
```json
{
  "id": 2434,
  "name": "Produto A",
  "price": 1000
}
```

---

### Pedidos

> Rotas protegidas — exigem token JWT.

#### `GET /order/list` — Listar todos os pedidos

**Resposta 200:**
```json
[
  {
    "orderId": "uuid",
    "value": 1500,
    "creationDate": "2026-03-09T00:00:00.000Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
]
```

---

#### `POST /order` — Criar pedido

Aceita dois formatos de payload:

**Formato interno:**
```json
{
  "orderId": "uuid-opcional",
  "value": 1500,
  "creationDate": "2026-03-09T00:00:00.000Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

**Formato externo (integração):**
```json
{
  "numeroPedido": "PED-001",
  "valorTotal": 1500,
  "dataCriacao": "2026-03-09T00:00:00.000Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Resposta 201:**
```json
{
  "orderId": "uuid",
  "value": 1500,
  "creationDate": "2026-03-09T00:00:00.000Z",
  "items": [...]
}
```

---

#### `PUT /order/:orderId` — Atualizar pedido

**Parâmetro:** `orderId` (UUID do pedido)

**Body:**
```json
{
  "orderId": "uuid",
  "value": 2000,
  "items": [
    {
      "productId": 2435,
      "quantity": 2,
      "price": 500
    }
  ]
}
```

**Resposta 200:** pedido atualizado.

---

#### `DELETE /order/:orderId` — Deletar pedido

**Parâmetro:** `orderId` (UUID do pedido)

**Resposta 204:** sem conteúdo.

---

## Estrutura do projeto

```
src/
├── app.ts                    # Configuração do Express
├── server.ts                 # Inicialização do servidor
├── config/
│   └── swagger.ts            # Configuração Swagger
├── middlewares/
│   ├── authMiddleware.ts     # Validação do JWT
│   ├── errorHandler.ts       # Tratamento global de erros
│   └── validateSchema.ts     # Validação Zod
├── modules/
│   ├── auth/                 # Registro e login
│   ├── order/                # CRUD de pedidos + catálogo de produtos
│   └── user/                 # Entidade e repositório de usuários
└── shared/
    ├── prismaClient.ts       # Instância global do Prisma
    └── errors/               # Classes de erro customizadas
prisma/
├── schema.prisma             # Modelos User, Order, OrderItem
└── migrations/               # Histórico de migrations
```

---

## Scripts disponíveis

| Comando               | Descrição                                  |
|-----------------------|--------------------------------------------|
| `npm run dev`         | Inicia o servidor em modo desenvolvimento  |
| `npx prisma migrate dev`   | Cria e aplica migrations em dev       |
| `npx prisma migrate deploy` | Aplica migrations em produção        |
| `npx prisma studio`   | Interface visual para o banco de dados     |
| `docker compose up -d` | Sobe o container do PostgreSQL            |
| `docker compose down`  | Para e remove os containers               |
