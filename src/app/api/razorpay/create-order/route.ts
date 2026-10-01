import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If live Razorpay keys are configured
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // amount in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {},
      });

      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        isTestMode: false,
      });
    }

    // Fallback: Test simulation mode for instant out-of-the-box evaluation
    const mockOrderId = `order_sb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: Math.round(amount * 100),
      currency,
      keyId: 'rzp_test_scoopberry_demo',
      isTestMode: true,
      message: 'Running in simulated test payment mode (Razorpay keys not configured)',
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
