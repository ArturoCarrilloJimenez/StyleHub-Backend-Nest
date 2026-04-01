export const systemOverview = {
  name: 'StyleHub E-commerce Backend',
  version: '0.0.1',
  description: 'REST API for fashion e-commerce platform',
  framework: 'NestJS 11.0.1',
  language: 'TypeScript 5.7.3',
  database: 'PostgreSQL',
  orm: 'TypeORM 0.3.22'
};

export const modules = [
  { name: 'Auth', description: 'Authentication & Authorization with JWT', files: 7, lines: 450 },
  { name: 'Products', description: 'Product management with types, filters', files: 8, lines: 520 },
  { name: 'Cart', description: 'Shopping cart functionality', files: 5, lines: 280 },
  { name: 'Order', description: 'Order processing and management', files: 6, lines: 380 },
  { name: 'Payment', description: 'Stripe payment integration', files: 3, lines: 150 },
  { name: 'Files', description: 'File upload and serving', files: 4, lines: 180 },
  { name: 'Webhook', description: 'Stripe webhook handling', files: 3, lines: 120 },
  { name: 'Seed', description: 'Database seeding', files: 3, lines: 200 }
];

export const techStack = {
  backend: [
    { name: 'NestJS', version: '11.0.1', purpose: 'Framework' },
    { name: 'TypeScript', version: '5.7.3', purpose: 'Language' },
    { name: 'Node.js', version: '22.x', purpose: 'Runtime' }
  ],
  database: [
    { name: 'PostgreSQL', version: '14+', purpose: 'Database' },
    { name: 'TypeORM', version: '0.3.22', purpose: 'ORM' }
  ],
  authentication: [
    { name: 'Passport', version: '0.7.0', purpose: 'Auth middleware' },
    { name: 'JWT', version: '11.0.0', purpose: 'Token generation' },
    { name: 'bcrypt', version: '5.1.1', purpose: 'Password hashing' }
  ],
  validation: [
    { name: 'class-validator', version: '0.14.1', purpose: 'DTO validation' },
    { name: 'class-transformer', version: '0.5.1', purpose: 'Object transformation' }
  ],
  integrations: [
    { name: 'Stripe', version: '18.1.0', purpose: 'Payment processing' },
    { name: 'Nodemailer', version: '7.0.3', purpose: 'Email sending' }
  ],
  documentation: [
    { name: 'Swagger', version: '11.1.0', purpose: 'API documentation' }
  ]
};

export const architecture = {
  pattern: 'Modular Monolith',
  layers: ['Controllers', 'Services', 'Repositories', 'Entities'],
  principles: ['SOLID', 'DRY', 'Dependency Injection', 'Repository Pattern']
};
