export const endpoints = [
  {
    module: 'Auth',
    routes: [
      { method: 'POST', path: '/auth/register', auth: false, description: 'Register new user', dto: 'CreateUserDto' },
      { method: 'POST', path: '/auth/login', auth: false, description: 'Login user', dto: 'LoginUserDto' },
      { method: 'GET', path: '/auth/check-status', auth: true, description: 'Check authentication status', guards: ['JwtAuthGuard'] },
      { method: 'POST', path: '/auth/password-reset/request', auth: false, description: 'Request password reset' },
      { method: 'POST', path: '/auth/password-reset/confirm', auth: false, description: 'Confirm password reset' }
    ]
  },
  {
    module: 'Products',
    routes: [
      { method: 'GET', path: '/products', auth: false, description: 'Get all products with filters', query: 'FindAllProductsDto' },
      { method: 'GET', path: '/products/:term', auth: false, description: 'Get product by ID or slug' },
      { method: 'POST', path: '/products', auth: true, description: 'Create product', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'], dto: 'CreateProductDto' },
      { method: 'PATCH', path: '/products/:id', auth: true, description: 'Update product', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'], dto: 'UpdateProductDto' },
      { method: 'DELETE', path: '/products/:id', auth: true, description: 'Soft delete product', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'] }
    ]
  },
  {
    module: 'Product Types',
    routes: [
      { method: 'GET', path: '/product-type', auth: false, description: 'Get all product types' },
      { method: 'GET', path: '/product-type/:term', auth: false, description: 'Get product type by ID or name' },
      { method: 'POST', path: '/product-type', auth: true, description: 'Create product type', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'] },
      { method: 'PATCH', path: '/product-type/:id', auth: true, description: 'Update product type', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'] },
      { method: 'DELETE', path: '/product-type/:id', auth: true, description: 'Delete product type', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'] }
    ]
  },
  {
    module: 'Cart',
    routes: [
      { method: 'GET', path: '/cart', auth: true, description: 'Get user cart', guards: ['JwtAuthGuard'] },
      { method: 'PATCH', path: '/cart', auth: true, description: 'Add/Update product in cart', guards: ['JwtAuthGuard'], dto: 'UpdateCartProductDto' },
      { method: 'DELETE', path: '/cart/:productId', auth: true, description: 'Remove product from cart', guards: ['JwtAuthGuard'] }
    ]
  },
  {
    module: 'Orders',
    routes: [
      { method: 'POST', path: '/order/checkout', auth: true, description: 'Create order and payment session', guards: ['JwtAuthGuard'], dto: 'OrderPaymentDto' },
      { method: 'GET', path: '/order/:id', auth: true, description: 'Get order by ID', guards: ['JwtAuthGuard'] }
    ]
  },
  {
    module: 'Files',
    routes: [
      { method: 'GET', path: '/files/product/:imageName', auth: false, description: 'Get product image' },
      { method: 'POST', path: '/files/product', auth: true, description: 'Upload product image', guards: ['JwtAuthGuard', 'RolesGuard'], roles: ['admin'] }
    ]
  },
  {
    module: 'Webhook',
    routes: [
      { method: 'POST', path: '/webhook/stripe', auth: false, description: 'Stripe webhook for payment events' }
    ]
  },
  {
    module: 'Seed',
    routes: [
      { method: 'GET', path: '/seed', auth: false, description: 'Execute seed (populate database)' }
    ]
  }
];
