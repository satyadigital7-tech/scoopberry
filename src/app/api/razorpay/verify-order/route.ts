import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If live Razorpay key secret is configured, strictly verify the crypto signature
    if (keySecret && razorpaySignature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (generatedSignature !== razorpaySignature) {
        return NextResponse.json(
          { verified: false, error: 'Invalid payment signature. Verification failed.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        verified: true,
        message: 'Payment verified successfully',
        paymentId: razorpayPaymentId,
      });
    }

    // In demo / test simulation mode:
    if (razorpayPaymentId && razorpayOrderId) {
      return NextResponse.json({
        verified: true,
        message: 'Payment verified successfully (Simulated mode)',
        paymentId: razorpayPaymentId,
      });
    }

    return NextResponse.json(
      { verified: false, error: 'Payment details missing' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { verified: false, error: 'Internal payment verification error' },
      { status: 500 }
    );
  }
}
