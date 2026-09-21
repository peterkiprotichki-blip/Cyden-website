# Cyden Distributors Limited — Official Website & POS-Ready Catalogue

This repository contains the marketing and e-catalogue platform for **Cyden Distributors Limited**, an **EABL (East African Breweries Limited) Gold Distributor (2024)** based in Eldoret, Kenya.

The platform showcases the company, its regional distribution infrastructure, branch network, and complete beverage catalogue (beer, spirits, wines, gin, vodka, whisky, rum) across Uasin Gishu, Elgeyo Marakwet, and Nandi County.

---

## 1. Key Architectural Features

- **Single Data-Access Layer (POS Adapter):** Designed specifically so static/seeded catalogue data can be swapped for a live POS feed via REST API with **zero frontend component refactoring**.
- **Age Verification Gate:** Complies with Kenyan legal drinking age (18+) via a blocking modal that stores authorization in `localStorage` for 30 days. Includes a tester reset button in the footer for quick evaluation.
- **TheBar.com Outbound Integration (Phase 1):** Provides CTAs directing visitors to Kenya Breweries' official direct-to-consumer digital marketplace (`ke.thebar.com`), alongside a B2B fast-order dispatch desk (WhatsApp/Email) for retail outlets.
- **Mobile-First Responsive Design:** Styled with Tailwind CSS matching the corporate brand palette:
  - **Primary Teal:** `#3AA88C`
  - **Accent Coral:** `#E8582F`
  - **Deep Navy:** `#1B3E6F`
  - **Golden Yellow:** `#F2A93B`
  - **Fresh Green:** `#7DBE3C`
  - **Off-White Surface:** `#F8F7F4`

---

## 2. Plugging in the Real POS API (Integration Guide)

All components fetch product data exclusively through `src/services/products.ts`. No component queries a static array directly.

### File to Modify
`src/services/products.ts`

### Step-by-Step Instructions

1. **Add Environment Variables to `.env`:**
   ```env
   POS_API_BASE_URL=https://api.your-pos-system.com/v1
   POS_API_KEY=your_secure_api_key_here
   ```

2. **Locate `fetchFromPosApi()` in `src/services/products.ts`:**
   ```typescript
   async function fetchFromPosApi(): Promise<Product[] | null> {
     // ...
     const response = await fetch(`${posConfig.apiUrl}/products`, {
       headers: {
         'Authorization': `Bearer ${posConfig.apiKey}`,
         'Content-Type': 'application/json',
       },
     });
     // ...
   }
   ```

3. **Field Mapping Requirement:**
   Ensure the response from your POS vendor maps into Cyden's `Product` model:
   ```typescript
   export interface Product {
     id: string;          // Maps from POS SKU / item code
     name: string;        // Maps from POS item name / description
     brand: string;       // e.g. "Tusker", "Johnnie Walker"
     category: string;    // 'Beer' | 'Gin' | 'Vodka' | 'Whisky' | 'Rum' | 'Liquor' | 'Wine'
     size: string;        // e.g. "500ml", "750ml", "1000ml"
     price: number;       // Retail/wholesale price in KSH (number)
     currency: 'KSH';
     image_url: string | null;
     in_stock: boolean;   // Maps from POS inventory qty > 0
     featured: boolean;   // Drives 'Most Popular Drinks' on homepage
     description: string | null;
     abv?: string;        // e.g. "4.5%", "40%"
     packaging?: string;  // e.g. "Crate of 25 bottles", "Case of 12"
   }
   ```

4. **Automatic Fallback:**
   If the POS API is down, returns an HTTP error, or is unreachable, the system gracefully falls back to cached items or the seed catalogue without breaking the page.

---

## 3. TheBar.com (ke.thebar.com) Order Integration (Phase 2 Guide)

### File to Modify
`src/services/thebar.ts`

### Background
`ke.thebar.com` ("The Bar") is Kenya Breweries Limited's (EABL/Diageo) direct-to-consumer digital marketplace. It operates on a closed Diageo commerce infrastructure without public developer keys. Fulfillment in the North Rift is routed to Cyden Distributors as an EABL Gold Distributor.

### How to Upgrade from Phase 1 to Phase 2

1. **Obtain Partner API / Webhook Access from EABL:**
   Contact the EABL/KBL Digital Commerce team to receive distributor fulfillment webhook endpoints and authentication keys.

2. **Configure Webhook Endpoint:**
   Create an endpoint (e.g. `/api/thebar/webhook`) that receives orders routed to Cyden and transforms them using the `Order` data model defined in `src/types.ts`:
   ```typescript
   export interface Order {
     order_id: string;
     source: 'thebar' | 'offline_request' | 'whatsapp';
     customer_name: string;
     customer_phone: string;
     outlet_name?: string;
     delivery_location?: string;
     items: Array<{
       product_id: string;
       name: string;
       quantity: number;
       price: number;
       size?: string;
     }>;
     total: number;
     status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled';
     created_at: string;
     notes?: string;
   }
   ```

3. **Update `THEBAR_STOREFRONT_URL`:**
   In `src/services/thebar.ts`, replace the placeholder URL with Cyden's dedicated partner storefront URL:
   ```typescript
   export const THEBAR_STOREFRONT_URL = 'https://ke.thebar.com/en-ke/distributors/cyden-eldoret';
   ```

---

## 4. Local Development & Build

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build production bundle
npm run build

# Run TypeScript check
npm run lint
```

---

## 5. Branch Details & Regional Presence

- **Main Office & Central Godown:** Rupa Godowns, P.O Box 1629-30100, Eldoret, Uasin Gishu County. Phone: `+254 722 400 409`
- **Regional Depository:** Sitet Building, Iten Town, Elgeyo Marakwet County. Phone: `+254 754 722 746`
- **Coverage Area:** 600+ Outlets across Uasin Gishu, Elgeyo Marakwet, and Nandi County.
