"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { client } from '@/sanity/lib/client';
import { Clock, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Brands from '@/components/Brands';

export default function OrderCompletePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const completeOrder = async () => {
      if (!sessionId) {
        console.log("Session Id Not Found")
        return;
      }

      try {
        // Fetch Stripe session data
        const response = await fetch(`/api/get-stripe-session?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe session');
        }

        const { session } = await response.json();
        const orderData = JSON.parse(localStorage.getItem('currentOrder') || '{}');

        // Save order to Sanity with payment info
        await client.create({
          _type: 'order',
          ...orderData,
          status: 'Confirmed',
          paymentInfo: {
            paymentId: session.payment_intent,
            paymentStatus: session.payment_status,
            paymentAmount: session.amount_total ? session.amount_total / 100 : 0,
            paymentCurrency: session.currency,
            paymentDate: new Date().toISOString(),
          },
        });

        // Clear local storage
        localStorage.removeItem('currentOrder');

        toast({
          title: 'Order Complete!',
          description: 'Your payment was successful and your order has been placed.',
        });
      } catch (error) {
        console.error('Order completion failed:', error);
        toast({
          title: 'Order Error',
          description: 'There was an error completing your order. Please contact support.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    completeOrder();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Processing Your Order...</h1>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Hekto Order Complete
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li className="text-[#FB2E86]">Order Completed</li>
          </ul>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white">
        <div className="relative w-full max-w-[600px] flex flex-col items-center text-center">
          {/* Clock Icon */}
          <div className="absolute -left-16 -top-12 mb-6">
            <Clock className="w-16 h-16 text-[#2F4F96]" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Your Order Is Completed!
          </h1>

          {/* Confirmation Text */}
          <div className="space-y-1 mb-8">
            <p className="text-gray-500 text-sm md:text-base">
              Thank you for your order! Your order is being processed and will
              be completed within 3-6
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              hours. You will receive an email confirmation when your order is
              completed.
            </p>
          </div>

          {/* Continue Shopping Button */}
          <Link href={`/shop`}>
          
          <Button className="bg-[#FF4E9D] hover:bg-[#FF4E9D]/90 text-white rounded-md px-8 py-2.5 mb-16">
            Continue Shopping
          </Button>
          </Link>

          <Brands />

          {/* Document Icon */}
          <div className="absolute bottom-12 -right-10">
          <NotebookPen size={60} color="#ff29bb" strokeWidth={4} absoluteStrokeWidth />
          </div>
        </div>
      </div>
    </div>
  );
}
