# Geek Center - Sistema de Gerenciamento de Vendas

Sistema para gerenciamento de vendas de produtos geek, desenvolvido com Node.js, Express, TypeORM e PostgreSQL no backend, e HTML, CSS e JavaScript vanilla no frontend.

## 🚀 Como Executar

### Pré-requisitos
- Node.js
- Docker e Docker Compose
- PostgreSQL

### Backend

1. Navegue até a pasta `backend`:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

4. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. Navegue até a pasta `frontend`:
```bash
cd frontend
```

2. Abra o arquivo `index.html` no navegador
   - Você pode usar um servidor local como o Live Server do VSCode
   - Ou simplesmente abrir o arquivo diretamente no navegador

## 📋 Funcionalidades

### Produtos
- Cadastro de produtos
- Listagem de produtos
- Exclusão de produtos
- Tipos: Action Figure, HQ, Poster, Livro, Filme

### Clientes
- Cadastro de clientes
- Listagem de clientes
- Exclusão de clientes

### Compras
- Registro de compras
- Listagem de compras por cliente

### Relatórios
- Produtos mais vendidos
- Clientes mais ativos
- Total de vendas

## 🛠️ Tecnologias

### Backend
- Node.js
- Express
- TypeORM
- PostgreSQL
- Docker

### Frontend
- HTML
- CSS (com tema Gruvbox)
- JavaScript Vanilla

## 📱 Interface

- Design responsivo
- Menu burger para mobile
- Tema escuro (Gruvbox)
- Formulários expansíveis
- Navegação por abas

## 🔧 Configuração do Banco de Dados

O banco de dados é configurado automaticamente pelo TypeORM com as seguintes credenciais:
- Host: localhost
- Porta: 5432
- Usuário: postgres
- Senha: postgres
- Database: geek_center

## 📝 Notas

- O frontend assume que o backend está rodando em `http://localhost:3000`
- O sistema usa soft delete (status 0/1) para exclusão de registros
- Interface otimizada para desktop e mobile
