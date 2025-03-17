import { Router } from 'express';
import { ProductController } from './controllers/ProductController';
import { ClientController } from './controllers/ClientController';
import { PurchaseController } from './controllers/PurchaseController';
import { RecommendationController } from './controllers/RecommendationController';
import { ReportController } from './controllers/ReportController';

const routes = Router();

const productController = new ProductController();
const clientController = new ClientController();
const purchaseController = new PurchaseController();
const recommendationController = new RecommendationController();
const reportController = new ReportController();

// Rotas de Produtos
routes.post('/products', productController.create.bind(productController));
routes.get('/products', productController.findAll.bind(productController));
routes.get('/products/:id', productController.findOne.bind(productController));
routes.delete('/products/:id', productController.delete.bind(productController));

// Rotas de Clientes
routes.post('/clients', clientController.create.bind(clientController));
routes.get('/clients', clientController.findAll.bind(clientController));
routes.get('/clients/:id', clientController.findOne.bind(clientController));
routes.delete('/clients/:id', clientController.delete.bind(clientController));

// Rotas de Compras
routes.post('/purchases', purchaseController.create.bind(purchaseController));
routes.get('/purchases/client/:clientId', purchaseController.findByClient.bind(purchaseController));

// Rotas de Recomendações
routes.get('/recommendations/:clientId', recommendationController.getRecommendations.bind(recommendationController));

// Rotas de Relatórios
routes.get('/reports/products', reportController.productsByPurchases.bind(reportController));
routes.get('/reports/clients', reportController.clientsByPurchases.bind(reportController));
routes.get('/reports/sales', reportController.totalSales.bind(reportController));

export default routes; 