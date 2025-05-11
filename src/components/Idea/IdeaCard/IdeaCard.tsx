/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import {
  User,
  CalendarDays,
  MessageCircle,
  Heart,
  HeartOff,
  Sparkles,
  ShieldCheck,
  FileText,
  ShoppingCart,
  Gem,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import IdeaCardCarousel from './IdeaCardCarosule';
import { createPayment } from '@/services/Payment';
import IdeaActionSkeleton from './IdeaActionSkelletion';
import { Idea } from '@/types/idea';

const IdeaCard = ({ idea }: { idea: Idea }) => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleLinkClick = (e: any) => {
    if (!idea.isPaid) return;

    if (!user) {
      e.preventDefault();
      window.location.href = `/login?returnUrl=${encodeURIComponent(`/idea/${idea.id}`)}`;
      return;
    }

    const hasPaid = idea.payments?.some(
      p => p.userEmail?.toLowerCase() === user?.email?.toLowerCase() && p.status === 'Paid'
    );

    if (!hasPaid) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card className="rounded-2xl overflow-hidden border shadow-md dark:bg-[#111]">
        <IdeaCardCarousel idea={idea} />

        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-[#14B8A6]">
              <User className="w-4 h-4" />
              {idea.author?.name}
            </span>
            <span className="flex items-center gap-1 text-[#14B8A6]">
              <CalendarDays className="w-4 h-4" />
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-[#14B8A6]">{idea.title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {idea.description}
          </p>

          <div className="flex gap-4 text-[#14B8A6] text-sm">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {idea.comments?.length ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {idea.votes?.filter(v => v.type === 'UP')?.length ?? 0}
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <HeartOff className="w-4 h-4" />
              {idea.votes?.filter(v => v.type === 'DOWN')?.length ?? 0}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-5 flex flex-col gap-3 border-t">
          <div className="flex items-center gap-3 justify-between text-sm">
            <span className="bg-[#14B8A6]/10 text-[#14B8A6] px-3 py-1 rounded-full">
              {idea.category?.name}
            </span>
            <span className="text-lg font-bold text-[#14B8A6]">
              {idea.isPaid ? `$${idea.price?.toFixed(2)}` : 'Free'}
            </span>
          </div>

          {isLoading ? (
            <IdeaActionSkeleton />
          ) : (
            <Link href={`/idea/${idea.id}`} onClick={handleLinkClick} className="w-full">
              <Button
                size="lg"
                className="w-full bg-[#14B8A6] hover:bg-[#14b8a5d1] text-white font-semibold rounded-xl"
              >
                {idea.isPaid ? 'Unlock Premium' : 'View Solution'}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-lg max-w-md">
          <div className="text-center space-y-4">
            <div className="p-4 bg-[#14B8A6] rounded-full inline-block animate-bounce">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Premium Idea</DialogTitle>
              <DialogDescription>Unlock lifetime access to detailed insights</DialogDescription>
            </DialogHeader>

            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <FileText className="w-4 h-4 text-[#14B8A6]" />
                Step-by-step guide
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Exclusive strategies
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Priority support
              </div>
            </div>

            <div className="text-xl font-bold text-[#14B8A6]">
              ${idea.price?.toFixed(2)} <span className="text-sm">/ one-time</span>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  handlePayment(idea.id);
                }}
                className="bg-[#14B8A6] hover:bg-emerald-600 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Access Now
              </Button>
              <Button
                variant="ghost"
                className="text-[#14B8A6]"
                onClick={() => setIsModalOpen(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IdeaCard;
