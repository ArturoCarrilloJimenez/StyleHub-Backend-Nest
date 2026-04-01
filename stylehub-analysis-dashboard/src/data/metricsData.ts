import { seedProducts, productStats } from './seedProducts';

export const salesData = [
  { month: 'Jan', revenue: 12500, orders: 45, avgOrder: 277.78 },
  { month: 'Feb', revenue: 15800, orders: 58, avgOrder: 272.41 },
  { month: 'Mar', revenue: 18200, orders: 67, avgOrder: 271.64 },
  { month: 'Apr', revenue: 21500, orders: 78, avgOrder: 275.64 },
  { month: 'May', revenue: 24300, orders: 89, avgOrder: 273.03 },
  { month: 'Jun', revenue: 28900, orders: 102, avgOrder: 283.33 }
];

export const topProducts = seedProducts
  .sort((a, b) => b.stock - a.stock)
  .slice(0, 10)
  .map(p => ({ name: p.title, stock: p.stock, price: p.price, revenue: p.stock * p.price }));

export const categoryDistribution = [
  { category: 'Shirts', count: productStats.byType.shirts, percentage: (productStats.byType.shirts / productStats.total * 100).toFixed(1) },
  { category: 'Hoodies', count: productStats.byType.hoodies, percentage: (productStats.byType.hoodies / productStats.total * 100).toFixed(1) },
  { category: 'Hats', count: productStats.byType.hats, percentage: (productStats.byType.hats / productStats.total * 100).toFixed(1) },
  { category: 'Pants', count: productStats.byType.pants, percentage: (productStats.byType.pants / productStats.total * 100).toFixed(1) }
];

export const genderDistribution = [
  { gender: 'Men', count: productStats.byGender.men, percentage: (productStats.byGender.men / productStats.total * 100).toFixed(1) },
  { gender: 'Women', count: productStats.byGender.women, percentage: (productStats.byGender.women / productStats.total * 100).toFixed(1) },
  { gender: 'Kids', count: productStats.byGender.kid, percentage: (productStats.byGender.kid / productStats.total * 100).toFixed(1) },
  { gender: 'Unisex', count: productStats.byGender.unisex, percentage: (productStats.byGender.unisex / productStats.total * 100).toFixed(1) }
];

export const priceRanges = [
  { range: '$0-$50', count: seedProducts.filter(p => p.price < 50).length },
  { range: '$50-$100', count: seedProducts.filter(p => p.price >= 50 && p.price < 100).length },
  { range: '$100-$150', count: seedProducts.filter(p => p.price >= 100 && p.price < 150).length },
  { range: '$150+', count: seedProducts.filter(p => p.price >= 150).length }
];

export const stockStatus = {
  inStock: productStats.total - productStats.outOfStock,
  outOfStock: productStats.outOfStock,
  lowStock: seedProducts.filter(p => p.stock > 0 && p.stock < 10).length,
  totalUnits: productStats.totalStock
};

export const orderStatuses = [
  { status: 'PENDING', count: 12, percentage: 15 },
  { status: 'SUCCESSFUL', count: 58, percentage: 72.5 },
  { status: 'FAILED', count: 5, percentage: 6.25 },
  { status: 'CANCELLED', count: 5, percentage: 6.25 }
];

export const conversionFunnel = [
  { stage: 'Visits', count: 5000, percentage: 100 },
  { stage: 'Product Views', count: 3500, percentage: 70 },
  { stage: 'Add to Cart', count: 1200, percentage: 24 },
  { stage: 'Checkout', count: 450, percentage: 9 },
  { stage: 'Purchase', count: 280, percentage: 5.6 }
];
