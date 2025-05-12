export enum OrderStatus {
  PENDING = 'PENDING', // PaymentIntent created in Stripe, awaiting confirmation
  SUCCESSFUL = 'SUCCESSFUL', // Payment successful
  FAILED = 'FAILED', // Payment attempted but not completed (card declined, timeout, etc.)
  EXPIRED = 'EXPIRED', // Payment expired, payment not success
  CANCELED = 'CANCELED', // Order canceled by user or system
  REFUNDED = 'REFUNDED', // Payment already refunded to Stripe
}
