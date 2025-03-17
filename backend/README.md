# Geek Center API Documentation

## Base URL

A base URL para acessar a API é:

```
http://localhost:3000
```

## Clientes

### Criar um novo cliente

```
POST /clients
```

### Listar todos os clientes

```
GET /clients
```

### Buscar cliente por ID

```
GET /clients/:id
```

### Deletar cliente por ID

```
DELETE /clients/:id
```

## Produtos

### Criar um novo produto

```
POST /products
```

### Listar todos os produtos

```
GET /products
```

### Buscar produto por ID

```
GET /products/:id   
```

### Deletar produto por ID

```
DELETE /products/:id    
```

## Compras

### Criar uma nova compra

```
POST /purchases
```

### Listar todas as compras

```
GET /purchases
```

### Buscar compra por ID

```
GET /purchases/:id
```

### Deletar compra por ID

```
DELETE /purchases/:id
```

## Recomendações

### Obter recomendações para um cliente

```
GET /recommendations/:clientId
```

## Relatórios

### Relatório de produtos mais vendidos

```
GET /reports/products
```

### Relatório de clientes mais comprados

```
GET /reports/clients    
```

### Relatório de vendas totais

```
GET /reports/total
```

## Docker

### Iniciar a aplicação

```
docker-compose up --build
```

### Parar a aplicação

```
docker-compose down
```

### Acessar o container do PostgreSQL

```
docker exec -it geek-center-db bash
```
