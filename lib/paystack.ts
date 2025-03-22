/**
 * Paystack Integration Module
 * This module handles all Paystack payment gateway operations including:
 * - Payment initialization
 * - Payment verification
 * - Webhook signature verification
 * - Transaction reference generation
 */

import crypto from "crypto";

// Paystack secret key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

/**
 * Parameters required to initialize a Paystack payment
 */
interface PaystackInitializeParams {
  /** Customer's email address */
  email: string;
  /** Amount in kobo (Nigerian currency subunit). E.g., 5000 for ₦50 */
  amount: number;
  /** Additional data to be passed to Paystack */
  metadata: {
    /** Unique identifier of the user making the payment */
    userId: string;
    /** ID of the membership plan being purchased */
    planId: string;
    /** Name of the membership plan */
    planName: string;
    /** ID of the membership record */
    membershipId: string;
    /** Type of payment - new subscription or renewal */
    paymentType: "new_subscription" | "renewal";
  };
  /** Optional custom transaction reference */
  reference?: string;
}

/**
 * Initializes a payment transaction with Paystack
 * @param {PaystackInitializeParams} params - Payment initialization parameters
 * @returns {Promise<Object>} Authorization URL and reference for the transaction
 * @throws {Error} If payment initialization fails
 */
export async function initializePayment({
  email,
  amount,
  metadata,
  reference,
}: PaystackInitializeParams) {
  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          metadata,
          reference,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message);
    }

    return data.data; // Returns { authorization_url, reference }
  } catch (error) {
    console.error("Paystack initialization error:", error);
    throw error;
  }
}

/**
 * Verifies a payment transaction using its reference
 * @param {string} reference - The transaction reference to verify
 * @returns {Promise<Object>} Transaction data including status and customer info
 * @throws {Error} If verification fails
 */

export async function verifyPayment(reference: string) {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message);
    }

    return data.data; // Returns transaction details
  } catch (error) {
    console.error("Paystack verification error:", error);
    throw error;
  }
}

/**
 * Verifies the signature of a Paystack webhook payload
 * Used to ensure webhook requests are actually from Paystack
 * @param {string | Buffer} payload - The raw webhook payload
 * @param {string} signature - The X-Paystack-Signature header value
 * @returns {boolean} True if signature is valid, false otherwise
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
) {
  try {
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(payload)
      .digest("hex");

    return hash === signature;
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return false;
  }
}

/**
 * Generates a unique transaction reference
 * Format: GYM_[timestamp]_[random string]
 * @returns {string} A unique transaction reference
 */
export function generateTransactionReference() {
  return `GYM_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
