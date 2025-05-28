'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/(publicRoute)/cart/_compoenets/CartContext';

const CartButton = () => {
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <motion.div
      className="flex gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Link href="/cart" passHref>
        <Button
          variant="outline"
          className="rounded-full size-10 flex bg-secondary text-primary items-center justify-center gap-1 relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {cartCount}
            </motion.span>
          )}
        </Button>
      </Link>
    </motion.div>
  );
};

export default CartButton;
