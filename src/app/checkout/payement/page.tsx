"use client";
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { OrderData } from '@/types/orderTypes';

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      const orderData:OrderData = JSON.parse(localStorage.getItem('currentOrder') || '{}');
      const stripeOrderData = orderData.products.map(({ price, name, quantity }) => ({
        price,
        name,
        quantity,
      }));
      
    
      if (!orderData || !orderData.products) {
        toast({
          title: 'Order Error',
          description: 'No order data found. Please try again.',
          variant: 'destructive',
        });
        router.push('/checkout');
        return;
      }

      try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stripeOrderData),
        });

        if (!response.ok) {
          throw new Error('Failed to create Stripe session');
        }

        const { sessionId } = await response.json();

        const { error } = await stripe!.redirectToCheckout({ sessionId });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Payment processing failed:', error);
        toast({
          title: 'Payment Error',
          description: 'There was an error processing your payment. Please try again.',
          variant: 'destructive',
        });
        router.push('/checkout');
      }
    };

    processPayment();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
        <p>Please wait while we redirect you to the payment gateway.</p>
      </div>
    </div>
  );
}