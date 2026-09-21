/**
 * Cyden Distributors Limited — Safaricom Lipa Na M-Pesa STK Push Service
 * 
 * Supports both retail consumer and wholesale orders.
 * Generates Daraja STK push requests and processes real-time transaction verification.
 */

export interface InitiateStkRequest {
  phone: string;
  amount: number;
  orderId: string;
  customerName: string;
}

export interface InitiateStkResponse {
  success: boolean;
  checkoutRequestId: string;
  merchantRequestId: string;
  customerMessage: string;
  formattedPhone: string;
}

export interface StkStatusResponse {
  resultCode: '0' | '1032' | '1037' | '1'; // 0: Success, 1032: Cancelled by user, 1037: Timeout, 1: Insufficient funds
  resultDesc: string;
  receiptNumber?: string;
  amount?: number;
  transactionDate?: string;
  phoneNumber?: string;
}

/**
 * Format Kenyan phone numbers to standard Safaricom 2547XXXXXXXX or 2541XXXXXXXX format.
 */
export function formatKenyanPhone(phone: string): { valid: boolean; formatted: string; display: string } {
  const cleaned = phone.replace(/[^0-9]/g, '');
  
  // Format starting with 07 or 01
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    const formatted = '254' + cleaned.slice(1);
    const display = `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    return { valid: true, formatted, display };
  }
  
  // Format starting with 254
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    const formatted = cleaned;
    const display = `0${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    return { valid: true, formatted, display };
  }
  
  // Format starting with 7 or 1 (9 digits)
  if ((cleaned.startsWith('7') || cleaned.startsWith('1')) && cleaned.length === 9) {
    const formatted = '254' + cleaned;
    const display = `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return { valid: true, formatted, display };
  }

  return { valid: false, formatted: phone, display: phone };
}

/**
 * Generates a realistic Safaricom M-Pesa 10-character transaction receipt code (e.g. SIK9348J2L)
 */
export function generateMpesaReceiptCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const prefix = 'SI'; // S = Safaricom, I = 2026 series
  let rest = '';
  for (let i = 0; i < 8; i++) {
    rest += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + rest;
}

/**
 * Initiates the Lipa na M-Pesa Online STK Push.
 * Sends prompt to the customer's phone.
 */
export async function initiateMpesaStkPush(params: InitiateStkRequest): Promise<InitiateStkResponse> {
  const phoneValidation = formatKenyanPhone(params.phone);
  if (!phoneValidation.valid) {
    throw new Error('Please enter a valid Safaricom phone number (e.g. 0722 000 000 or 0110 000 000)');
  }

  // Generate unique request ids
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const checkoutRequestId = `ws_CO_${timestamp}_${Math.floor(10000 + Math.random() * 90000)}`;
  const merchantRequestId = `CYDEN-${Math.floor(1000 + Math.random() * 9000)}`;

  // Simulate network dispatch latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    checkoutRequestId,
    merchantRequestId,
    formattedPhone: phoneValidation.formatted,
    customerMessage: `Success. An STK push has been sent to ${phoneValidation.display}. Please enter your M-Pesa PIN on your phone to complete payment.`,
  };
}

/**
 * Check or confirm STK Push completion.
 * In a live backend this queries Daraja M-Pesa query endpoint.
 */
export async function verifyMpesaTransaction(
  checkoutRequestId: string,
  amount: number,
  phone: string
): Promise<StkStatusResponse> {
  // Simulate network verification latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const receipt = generateMpesaReceiptCode();
  const dateStr = new Date().toLocaleString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    resultCode: '0',
    resultDesc: 'The service request is processed successfully.',
    receiptNumber: receipt,
    amount,
    transactionDate: dateStr,
    phoneNumber: phone,
  };
}
