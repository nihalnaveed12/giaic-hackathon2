import { CartItem } from '@/redux/types';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface Items {
  name: string;
  price: number;
  quantity: number
}

export async function POST(request: Request) {
    try {
      const orderData = await request.json();
      console.log('Order Data:', orderData); // Log order data
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderData.map((item:Items) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name, // Use product name from orderData
            },
            unit_amount: Math.round(item.price * 100), // Convert price to cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order-complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        metadata: {
          orderData: JSON.stringify(orderData),
        },
      });
  
      console.log('Stripe Session Created:', session.id); // Log session ID
      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error('Stripe Session Creation Error:', error); // Log error
      return NextResponse.json(
        { error: error },
        { status: 500 }
      );
    }
  
  }