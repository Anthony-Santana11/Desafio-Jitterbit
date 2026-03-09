import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Desafio Jitterbit API",
      version: "1.0.0",
      description: "API para gerenciamento de pedidos com autenticação JWT",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "secret123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              example: "secret123",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        OrderItem: {
          type: "object",
          required: ["productId", "quantity", "price"],
          properties: {
            productId: {
              type: "integer",
              example: 1,
            },
            quantity: {
              type: "integer",
              example: 2,
            },
            price: {
              type: "number",
              example: 49.99,
            },
          },
        },
        CreateOrderInternalRequest: {
          type: "object",
          required: ["orderId", "value", "creationDate", "items"],
          properties: {
            orderId: {
              type: "string",
              example: "ORD-001",
            },
            value: {
              type: "number",
              example: 99.98,
            },
            creationDate: {
              type: "string",
              example: "2026-03-08T00:00:00.000Z",
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        CreateOrderExternalRequest: {
          type: "object",
          required: ["numeroPedido", "valorTotal", "dataCriacao", "items"],
          properties: {
            numeroPedido: {
              type: "string",
              example: "PED-001",
            },
            valorTotal: {
              type: "number",
              example: 99.98,
            },
            dataCriacao: {
              type: "string",
              example: "2026-03-08T00:00:00.000Z",
            },
            items: {
              type: "array",
              items: {
                type: "object",
                required: ["idItem", "quantidadeItem", "valorItem"],
                properties: {
                  idItem: { type: "string", example: "1" },
                  quantidadeItem: { type: "integer", example: 2 },
                  valorItem: { type: "number", example: 49.99 },
                },
              },
            },
          },
        },
        UpdateOrderRequest: {
          type: "object",
          required: ["orderId", "value", "items"],
          properties: {
            orderId: {
              type: "string",
              example: "ORD-001",
            },
            value: {
              type: "number",
              example: 149.97,
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            orderId: { type: "string", example: "ORD-001" },
            value: { type: "number", example: 99.98 },
            creationDate: { type: "string", format: "date-time" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 2434 },
            name: { type: "string", example: "Produto A" },
            price: { type: "number", example: 1000 },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message" },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Validation error" },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "array", items: { type: "string" } },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Autenticação de usuários" },
      { name: "Orders", description: "Gerenciamento de pedidos" },
      { name: "Products", description: "Catálogo de produtos" },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Registrar novo usuário",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            "409": {
              description: "E-mail já cadastrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Autenticar usuário",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Login realizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            "401": {
              description: "Credenciais incorretas",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/product/{id}": {
        get: {
          tags: ["Products"],
          summary: "Buscar produto por ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID do produto (ex: 2434, 2435, 2436)",
              example: 2434,
            },
          ],
          responses: {
            "200": {
              description: "Produto encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            "400": {
              description: "ID inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Produto não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/order/list": {
        get: {
          tags: ["Orders"],
          summary: "Listar pedidos do usuário autenticado",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Lista de pedidos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Order" },
                  },
                },
              },
            },
            "401": {
              description: "Token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/order": {
        post: {
          tags: ["Orders"],
          summary: "Criar novo pedido",
          description:
            "Aceita formato interno (orderId, value, creationDate, items) ou formato externo (numeroPedido, valorTotal, dataCriacao, items).",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/CreateOrderInternalRequest" },
                    { $ref: "#/components/schemas/CreateOrderExternalRequest" },
                  ],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Pedido criado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            "401": {
              description: "Token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/order/{orderId}": {
        put: {
          tags: ["Orders"],
          summary: "Atualizar pedido existente",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "orderId",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "ORD-001",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateOrderRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Pedido atualizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            "401": {
              description: "Token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Pedido não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Orders"],
          summary: "Deletar pedido",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "orderId",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "ORD-001",
            },
          ],
          responses: {
            "204": {
              description: "Pedido deletado com sucesso",
            },
            "401": {
              description: "Token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Pedido não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
