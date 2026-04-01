export const entities = [
  {
    name: 'UserEntity',
    tableName: 'users',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'email', type: 'text', unique: true },
      { name: 'password', type: 'text' },
      { name: 'fullName', type: 'text', unique: true },
      { name: 'isActive', type: 'boolean', default: true },
      { name: 'roles', type: 'enum[]', default: ['user'] },
      { name: 'insertDate', type: 'timestamp' },
      { name: 'updateDate', type: 'timestamp' }
    ],
    relations: [
      { type: 'OneToMany', target: 'Product', field: 'productsInsert' },
      { type: 'OneToMany', target: 'OrderUserEntity', field: 'order' },
      { type: 'OneToMany', target: 'PasswordReset', field: 'passwordResets' }
    ]
  },
  {
    name: 'Product',
    tableName: 'product',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'title', type: 'text', unique: true },
      { name: 'price', type: 'float', default: 0 },
      { name: 'description', type: 'text', nullable: true },
      { name: 'slug', type: 'text', unique: true },
      { name: 'stock', type: 'int', default: 0 },
      { name: 'sizes', type: 'enum[]' },
      { name: 'gender', type: 'enum' },
      { name: 'images', type: 'text[]' },
      { name: 'isActive', type: 'boolean', default: true }
    ],
    relations: [
      { type: 'ManyToOne', target: 'UserEntity', field: 'user' },
      { type: 'ManyToOne', target: 'ProductType', field: 'type' },
      { type: 'OneToMany', target: 'CartProduct', field: 'cartProduct' }
    ]
  },
  {
    name: 'ProductType',
    tableName: 'product_type',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'name', type: 'text', unique: true }
    ],
    relations: [
      { type: 'OneToMany', target: 'Product', field: 'product' }
    ]
  },
  {
    name: 'Cart',
    tableName: 'shopping_cart',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'insertDate', type: 'timestamp' }
    ],
    relations: [
      { type: 'OneToOne', target: 'UserEntity', field: 'user' },
      { type: 'OneToMany', target: 'CartProduct', field: 'products' }
    ]
  },
  {
    name: 'CartProduct',
    tableName: 'cart_product',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'quantity', type: 'int', default: 1 },
      { name: 'size', type: 'enum' }
    ],
    relations: [
      { type: 'ManyToOne', target: 'Product', field: 'product' },
      { type: 'ManyToOne', target: 'Cart', field: 'cart' }
    ]
  },
  {
    name: 'OrderUserEntity',
    tableName: 'order_user',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'total_amount', type: 'float', default: 0 },
      { name: 'status', type: 'enum', default: 'PENDING' },
      { name: 'sessionPaymentId', type: 'text', unique: true },
      { name: 'paymentId', type: 'text', unique: true },
      { name: 'insertDate', type: 'timestamp' }
    ],
    relations: [
      { type: 'ManyToOne', target: 'UserEntity', field: 'user' },
      { type: 'OneToMany', target: 'OrderProductEntity', field: 'orderProducts' }
    ]
  },
  {
    name: 'OrderProductEntity',
    tableName: 'order_product',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'unitPrice', type: 'float' },
      { name: 'quantity', type: 'int', default: 1 },
      { name: 'size', type: 'enum' },
      { name: 'totalPrice', type: 'float' }
    ],
    relations: [
      { type: 'ManyToOne', target: 'Product', field: 'product' },
      { type: 'ManyToOne', target: 'OrderUserEntity', field: 'order' }
    ]
  },
  {
    name: 'PasswordReset',
    tableName: 'password_reset',
    fields: [
      { name: 'id', type: 'uuid', isPrimary: true },
      { name: 'token', type: 'text', unique: true },
      { name: 'expiresAt', type: 'timestamp' },
      { name: 'used', type: 'boolean', default: false }
    ],
    relations: [
      { type: 'ManyToOne', target: 'UserEntity', field: 'user' }
    ]
  }
];
