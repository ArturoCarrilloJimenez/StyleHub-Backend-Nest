export const authFlow = {
  title: 'Authentication Flow',
  steps: [
    { step: 1, action: 'User submits credentials', component: 'AuthController', method: 'POST /auth/login' },
    { step: 2, action: 'Validate DTO', component: 'ValidationPipe', details: 'class-validator checks email & password' },
    { step: 3, action: 'Find user by email', component: 'AuthService', method: 'login()' },
    { step: 4, action: 'Verify password', component: 'EncryptingData', method: 'isValidate()' },
    { step: 5, action: 'Check user is active', component: 'AuthService', details: 'Verify isActive flag' },
    { step: 6, action: 'Generate JWT token', component: 'JwtService', method: 'sign()' },
    { step: 7, action: 'Return user & token', component: 'AuthController', response: '{ user, token }' }
  ]
};

export const purchaseFlow = {
  title: 'Complete Purchase Flow',
  steps: [
    { step: 1, action: 'Browse products', component: 'ProductsController', method: 'GET /products', details: 'Filter by type, gender, price' },
    { step: 2, action: 'Add to cart', component: 'CartController', method: 'PATCH /cart', details: 'Create cart if not exists' },
    { step: 3, action: 'Update quantities', component: 'CartService', method: 'updateProduct()', details: 'Modify cart items' },
    { step: 4, action: 'Initiate checkout', component: 'OrderController', method: 'POST /order/checkout', guard: 'JwtAuthGuard' },
    { step: 5, action: 'Validate cart', component: 'OrderService', method: 'checkOrder()', details: 'Verify cart not empty' },
    { step: 6, action: 'Check stock', component: 'OrderService', method: 'checkStockProducts()', details: 'Ensure availability' },
    { step: 7, action: 'Create Stripe session', component: 'PaymentService', method: 'createSessionPayment()', details: 'Generate payment URL' },
    { step: 8, action: 'Create order', component: 'OrderService', method: 'createOrder()', transaction: true },
    { step: 9, action: 'Add order products', component: 'OrderService', method: 'addOrderProduct()', details: 'Link products to order' },
    { step: 10, action: 'Calculate total', component: 'OrderService', details: 'Sum all order products' },
    { step: 11, action: 'Redirect to Stripe', component: 'Frontend', details: 'User completes payment' },
    { step: 12, action: 'Stripe webhook', component: 'StripeController', method: 'POST /webhook/stripe', details: 'Payment confirmation' },
    { step: 13, action: 'Update order status', component: 'OrderService', method: 'updateOrderStatusBySessionPayment()' },
    { step: 14, action: 'Clear cart', component: 'CartService', method: 'removeCart()' },
    { step: 15, action: 'Update stock', component: 'OrderService', method: 'modifyStockProduct()', details: 'Decrease product stock' },
    { step: 16, action: 'Send confirmation email', component: 'EmailService', method: 'send()', template: 'invoice' }
  ]
};

export const paymentFlow = {
  title: 'Stripe Payment Flow',
  steps: [
    { step: 1, action: 'Create checkout session', component: 'PaymentService', details: 'Prepare line items from cart' },
    { step: 2, action: 'Configure session', details: 'Set shipping, payment methods, URLs' },
    { step: 3, action: 'Return session URL', details: 'Frontend redirects user' },
    { step: 4, action: 'User pays on Stripe', details: 'External Stripe checkout page' },
    { step: 5, action: 'Stripe sends webhook', endpoint: '/webhook/stripe', event: 'checkout.session.completed' },
    { step: 6, action: 'Verify webhook signature', component: 'StripeService', details: 'Ensure authenticity' },
    { step: 7, action: 'Process payment event', component: 'StripeService', method: 'handleWebhook()' },
    { step: 8, action: 'Update order status', status: 'SUCCESSFUL', details: 'Mark order as paid' }
  ]
};

export const stockManagement = {
  title: 'Stock Management Flow',
  steps: [
    { step: 1, action: 'Check stock on checkout', component: 'OrderService', method: 'checkStockProducts()' },
    { step: 2, action: 'Validate availability', details: 'Ensure quantity <= stock' },
    { step: 3, action: 'Reserve stock', details: 'Order created with PENDING status' },
    { step: 4, action: 'Payment confirmed', trigger: 'Stripe webhook' },
    { step: 5, action: 'Update stock', component: 'OrderService', method: 'modifyStockProduct()', transaction: true },
    { step: 6, action: 'Calculate new stock', formula: 'newStock = currentStock - quantity' },
    { step: 7, action: 'Update product', component: 'ProductsService', method: 'update()' },
    { step: 8, action: 'Commit transaction', details: 'All or nothing' }
  ]
};
