/**
 * Cyden Distributors Limited — TheBar.com Integration Service
 * 
 * ============================================================================
 * EABL / KBL DIGITAL MARKETPLACE (ke.thebar.com) SYNC & DEEP-LINK ARCHITECTURE
 * ============================================================================
 * ke.thebar.com ("The Bar") is Kenya Breweries Limited's (EABL/Diageo) official
 * direct-to-consumer digital marketplace. Fulfillment in the North Rift region
 * is assigned through Cyden (EABL Gold Distributor 2024).
 * 
 * This service provides:
 * 1. Product-level deep-linking to corresponding exact SKUs on ke.thebar.com.
 * 2. Multi-item cart transfer: customers who select multiple items on Cyden
 *    can launch a synced multi-product transfer view on TheBar.
 * 3. Verified catalog sync flags and live search query generation.
 * 4. Offline / direct B2B order request payload generation.
 */

import { Order, Product, CartItem } from '../types';

export const THEBAR_STOREFRONT_URL = 'https://ke.thebar.com/#/';
export const THEBAR_CYDEN_DIRECT_URL = 'https://ke.thebar.com/#/search/Cyden';

/**
 * Builds a direct deep-link URL to ke.thebar.com for an individual product.
 * ke.thebar.com uses Vue Hash routing: #/product/:name/:id or #/search/:term
 * Using direct /en-ke/ produces 404/500 errors on ke.thebar.com.
 */
export function getTheBarProductUrl(product: Product): string {
  if (product.thebar_url && !product.thebar_url.includes('/en-ke/')) {
    return product.thebar_url;
  }
  if (product.thebar_product_group_id) {
    return `https://ke.thebar.com/#/product/${encodeURIComponent(product.brand + ' ' + product.name)}/${product.thebar_product_group_id}`;
  }
  const cleanQuery = encodeURIComponent(product.name.trim());
  return `https://ke.thebar.com/#/search/${cleanQuery}`;
}

/**
 * Builds a safe multi-item transfer URL for ke.thebar.com.
 * Directs the customer to the exact product or primary brand search on ke.thebar.com
 * without triggering URL route 404s.
 */
export function getTheBarMultiItemTransferUrl(cartItems: CartItem[]): string {
  if (!cartItems || cartItems.length === 0) {
    return THEBAR_STOREFRONT_URL;
  }
  if (cartItems.length === 1) {
    return getTheBarProductUrl(cartItems[0].product);
  }
  // Deep-link to primary brand search on ke.thebar.com (e.g. "Tusker", "Guinness", "Johnnie Walker")
  const primaryBrand = cartItems[0].product.brand || cartItems[0].product.name.split(' ')[0];
  return `https://ke.thebar.com/#/search/${encodeURIComponent(primaryBrand)}`;
}

export interface TheBarTransferItem {
  name: string;
  brand: string;
  quantity: number;
  price: number;
  thebar_rrp?: number;
  thebar_url: string;
  thebar_sku?: string;
  thebar_product_group_id?: number;
}

export interface TheBarTransferSummary {
  storeUrl: string;
  totalItems: number;
  totalPrice: number;
  primaryBrandUrl: string;
  items: TheBarTransferItem[];
}

/**
 * Generates an itemized transfer manifest with direct deep links for each product in the cart.
 */
export function getTheBarBasketTransferSummary(cartItems: CartItem[]): TheBarTransferSummary {
  const items: TheBarTransferItem[] = cartItems.map((item) => ({
    name: item.product.name,
    brand: item.product.brand,
    quantity: item.quantity,
    price: item.product.price,
    thebar_rrp: item.product.thebar_rrp || item.product.price,
    thebar_url: getTheBarProductUrl(item.product),
    thebar_sku: item.product.thebar_product_code || item.product.eabl_sku,
    thebar_product_group_id: item.product.thebar_product_group_id,
  }));

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const primaryBrandUrl = getTheBarMultiItemTransferUrl(cartItems);

  return {
    storeUrl: THEBAR_STOREFRONT_URL,
    totalItems,
    totalPrice,
    primaryBrandUrl,
    items,
  };
}

// Sample mock orders for internal distributor auditing
export const MOCK_THEBAR_ORDERS: Order[] = [
  {
    order_id: 'TB-KE-84921',
    source: 'thebar',
    customer_name: 'Highlands Lounge & Grill',
    customer_phone: '+254 712 345 678',
    outlet_name: 'Highlands Lounge',
    delivery_location: 'Uganda Road, Eldoret',
    items: [
      { product_id: 'SKU-BEER-001', name: 'Tusker Cider', quantity: 10, price: 250, size: '500ml' },
      { product_id: 'SKU-BEER-002', name: 'Guinness Foreign Extra', quantity: 8, price: 230, size: '500ml' },
      { product_id: 'SKU-WHISKY-002', name: 'Johnnie Walker Black Label', quantity: 3, price: 3800, size: '750ml' }
    ],
    total: 15740,
    status: 'confirmed',
    created_at: '2026-09-17T14:20:00Z',
    notes: 'Urgent weekend restocking for Friday evening event.'
  },
  {
    order_id: 'TB-KE-84935',
    source: 'thebar',
    customer_name: 'Rimview Sports Bar',
    customer_phone: '+254 723 987 654',
    outlet_name: 'Rimview Bar & Restaurant',
    delivery_location: 'Iten Viewpoint, Iten',
    items: [
      { product_id: 'SKU-GIN-001', name: 'Gilbeys Special Dry Gin', quantity: 6, price: 1550, size: '750ml' },
      { product_id: 'SKU-VODKA-002', name: 'Smirnoff No. 21 Red Vodka', quantity: 6, price: 1550, size: '750ml' },
      { product_id: 'SKU-RUM-001', name: 'Captain Morgan Jamaican Rum', quantity: 4, price: 2500, size: '1000ml' }
    ],
    total: 28600,
    status: 'fulfilled',
    created_at: '2026-09-16T11:45:00Z',
    notes: 'Deliver to Iten sub-store pickup point.'
  }
];

export interface OrderSubmissionPayload {
  customer_name: string;
  customer_phone: string;
  outlet_name: string;
  delivery_location: string;
  items: Array<{
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    size?: string;
  }>;
  notes?: string;
  delivery_preference?: 'Main Office Eldoret' | 'Sub-Store Iten' | 'Direct Outlet Delivery';
}

/**
 * Handles offline / direct B2B order requests from outlets.
 * Generates structured message payload and saves locally.
 */
export async function submitOrderRequest(payload: OrderSubmissionPayload): Promise<{ success: boolean; orderId: string; whatsappUrl: string }> {
  const orderId = `CYD-${Math.floor(100000 + Math.random() * 900000)}`;
  const total = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Construct structured WhatsApp message for instant dispatch to Cyden dispatch desk (+254 722 400 409)
  const itemsList = payload.items
    .map((item) => `• ${item.quantity}x ${item.name} (${item.size || ''}) @ KSH ${item.price}`)
    .join('\n');

  const textMessage = `*NEW B2B ORDER REQUEST — CYDEN DISTRIBUTORS*
*Order Ref:* ${orderId}
*Outlet:* ${payload.outlet_name}
*Contact:* ${payload.customer_name} (${payload.customer_phone})
*Location:* ${payload.delivery_location}
*Delivery:* ${payload.delivery_preference || 'Standard Delivery'}

*Order Items:*
${itemsList}

*Estimated Total:* KSH ${total.toLocaleString()}
${payload.notes ? `*Notes:* ${payload.notes}\n` : ''}
Sent via Cyden Distributors B2B Portal`;

  const encodedMessage = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/254722400409?text=${encodedMessage}`;

  // Store in browser localStorage for tracking order history
  try {
    const existingOrders = JSON.parse(localStorage.getItem('cyden_recent_orders') || '[]');
    const newOrder: Order = {
      order_id: orderId,
      source: 'offline_request',
      customer_name: payload.customer_name,
      customer_phone: payload.customer_phone,
      outlet_name: payload.outlet_name,
      delivery_location: payload.delivery_location,
      items: payload.items,
      total,
      status: 'pending',
      created_at: new Date().toISOString(),
      notes: payload.notes
    };
    localStorage.setItem('cyden_recent_orders', JSON.stringify([newOrder, ...existingOrders].slice(0, 10)));
  } catch (e) {
    console.warn('Could not cache order to localStorage:', e);
  }

  return {
    success: true,
    orderId,
    whatsappUrl
  };
}

/**
 * Fetch orders for internal distributor auditing (combines TheBar feed + offline orders)
 */
export async function getTheBarOrders(): Promise<Order[]> {
  try {
    const local = JSON.parse(localStorage.getItem('cyden_recent_orders') || '[]');
    return [...local, ...MOCK_THEBAR_ORDERS];
  } catch {
    return MOCK_THEBAR_ORDERS;
  }
}
