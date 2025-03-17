const API_URL = 'http://localhost:3000';

// Products
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const product = {
        name: document.getElementById('product-name').value,
        type: parseInt(document.getElementById('product-type').value),
        value: parseFloat(document.getElementById('product-value').value),
        description: document.getElementById('product-description').value
    };

    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            productForm.reset();
            productForm.classList.add('hidden');
            document.querySelector('[data-form="product-form"]').textContent = '+ Novo Produto';
            loadProducts();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        productsList.innerHTML = products.map(product => `
            <div class="item-card">
                <h3>${product.name}</h3>
                <p>Tipo: ${getProductType(product.type)}</p>
                <p>Valor: R$ ${product.value.toFixed(2)}</p>
                <p>Descrição: ${product.description}</p>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                    Excluir
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProducts();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Clients
const clientForm = document.getElementById('client-form');
const clientsList = document.getElementById('clients-list');

clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const client = {
        name: document.getElementById('client-name').value,
        address: document.getElementById('client-address').value
    };

    try {
        const response = await fetch(`${API_URL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

        if (response.ok) {
            clientForm.reset();
            clientForm.classList.add('hidden');
            document.querySelector('[data-form="client-form"]').textContent = '+ Novo Cliente';
            loadClients();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadClients() {
    try {
        const response = await fetch(`${API_URL}/clients`);
        const clients = await response.json();
        
        clientsList.innerHTML = clients.map(client => `
            <div class="item-card">
                <h3>${client.name}</h3>
                <p>Endereço: ${client.address}</p>
                <button class="delete-btn" onclick="deleteClient(${client.id})">
                    Excluir
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteClient(id) {
    try {
        const response = await fetch(`${API_URL}/clients/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadClients();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function getProductType(type) {
    const types = {
        1: 'Action Figure',
        2: 'HQ',
        3: 'Poster',
        4: 'Livro',
        5: 'Filme'
    };
    return types[type] || 'Desconhecido';
}

// Load initial data
loadProducts();
loadClients();

// Purchases
const purchaseForm = document.getElementById('purchase-form');
const purchasesList = document.getElementById('purchases-list');
const clientSelect = document.getElementById('purchase-client');
const productSelect = document.getElementById('purchase-product');

async function loadSelects() {
    try {
        const [clientsResponse, productsResponse] = await Promise.all([
            fetch(`${API_URL}/clients`),
            fetch(`${API_URL}/products`)
        ]);

        const clients = await clientsResponse.json();
        const products = await productsResponse.json();

        clientSelect.innerHTML = `
            <option value="">Selecione o Cliente</option>
            ${clients.map(client => `
                <option value="${client.id}">${client.name}</option>
            `).join('')}
        `;

        productSelect.innerHTML = `
            <option value="">Selecione o Produto</option>
            ${products.map(product => `
                <option value="${product.id}">${product.name} - R$ ${product.value.toFixed(2)}</option>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error:', error);
    }
}

purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const purchase = {
        clientId: parseInt(clientSelect.value),
        productId: parseInt(productSelect.value)
    };

    try {
        const response = await fetch(`${API_URL}/purchases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        });

        if (response.ok) {
            purchaseForm.reset();
            purchaseForm.classList.add('hidden');
            document.querySelector('[data-form="purchase-form"]').textContent = '+ Nova Compra';
            loadPurchases();
            alert('Compra registrada com sucesso!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erro ao registrar compra');
    }
});

async function loadPurchases() {
    try {
        const response = await fetch(`${API_URL}/purchases/client/${clientSelect.value}`);
        const purchases = await response.json();
        
        purchasesList.innerHTML = purchases.map(purchase => `
            <div class="item-card">
                <h3>Compra #${purchase.id}</h3>
                <p>Produto: ${purchase.product.name}</p>
                <p>Valor: R$ ${purchase.product.value.toFixed(2)}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        purchasesList.innerHTML = '<p>Selecione um cliente para ver suas compras</p>';
    }
}

// Atualizar lista de compras quando selecionar um cliente
clientSelect.addEventListener('change', loadPurchases);

// Carregar dados iniciais
loadSelects();

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show corresponding view
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${link.dataset.view}-view`).classList.add('active');

        // Load data if needed
        if (link.dataset.view === 'reports') {
            loadReports();
        }
    });
});

// Reports
async function loadReports() {
    try {
        const [productsReport, clientsReport, salesReport] = await Promise.all([
            fetch(`${API_URL}/reports/products`).then(r => r.json()),
            fetch(`${API_URL}/reports/clients`).then(r => r.json()),
            fetch(`${API_URL}/reports/sales`).then(r => r.json())
        ]);

        // Products Report
        document.getElementById('products-report').innerHTML = productsReport
            .map(product => `
                <div class="report-item">
                    <span>${product.name}</span>
                    <span>${product.total_purchases} vendas</span>
                </div>
            `).join('');

        // Clients Report
        document.getElementById('clients-report').innerHTML = clientsReport
            .map(client => `
                <div class="report-item">
                    <span>${client.name}</span>
                    <span>${client.total_purchases} compras</span>
                </div>
            `).join('');

        // Sales Report
        document.getElementById('sales-report').innerHTML = `
            <div class="report-total">
                <h4>Total</h4>
                <p>R$ ${salesReport.total_value.toFixed(2)}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Form Toggle Buttons
document.querySelectorAll('.show-form-btn').forEach(button => {
    button.addEventListener('click', () => {
        const formId = button.dataset.form;
        const form = document.getElementById(formId);
        
        if (form.classList.contains('hidden')) {
            // Esconde todos os formulários primeiro
            document.querySelectorAll('form').forEach(f => f.classList.add('hidden'));
            // Mostra o formulário selecionado
            form.classList.remove('hidden');
            button.textContent = '- Cancelar';
        } else {
            form.classList.add('hidden');
            button.textContent = `+ Nov${formId.includes('client') ? 'o Cliente' : 
                                    formId.includes('product') ? 'o Produto' : 
                                    'a Compra'}`;
        }
    });
});

// Mobile Menu
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Fechar menu ao rolar a página
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
    lastScroll = currentScroll;
}); 