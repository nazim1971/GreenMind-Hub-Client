'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from './_compoenets/CartContext';
import { createPayment } from '@/services/Payment';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const item = cart[0];
  const router = useRouter();

  const handlePayment = async (id: string) => {
    try {
      const res = await createPayment({ ideaId: id });
      if (res.success && res.data) {
        router.push(res.data);
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-none dark:border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Cart</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {item ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item Card */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-[#14B8A6]" />
                  Shopping Cart (1 item)
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-1/3 h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {item.image && (
                      <Image
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-[#14B8A6] font-bold mt-2 text-xl">${item.price.toFixed(2)}</p>
                    
                    <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={clearCart}
                        variant="outline"
                        className="flex gap-2 items-center justify-center text-red-500 dark:text-red-400 border-red-400 dark:border-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-fit sticky top-8 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="font-medium dark:text-white">${item.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="font-medium dark:text-white">Free</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold dark:text-white">Total</span>
                    <span className="font-bold text-lg text-[#14B8A6] dark:text-[#2dd4bf]">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => handlePayment(item.ideaId)}
                className="w-full mt-6 bg-[#14B8A6] hover:bg-[#129c92] dark:bg-[#2dd4bf] dark:hover:bg-[#20a394] text-white h-12 flex gap-2 items-center justify-center transition-colors duration-200"
              >
                Proceed to Checkout
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Secure payment processing
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center transition-colors duration-200">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-[#14B8A6]/10 dark:bg-[#2dd4bf]/20 rounded-full">
              <ShoppingCart className="w-10 h-10 text-[#14B8A6] dark:text-[#2dd4bf]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{`Looks like you haven't added anything to your cart yet`}</p>
            <Link href="/idea" className="inline-block w-full">
              <Button className="w-full bg-[#14B8A6] hover:bg-[#129c92] dark:bg-[#2dd4bf] dark:hover:bg-[#20a394] text-white h-12 transition-colors duration-200">
                Browse Ideas
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}