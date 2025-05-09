'use client';

import { Button } from '@/components/ui/button';
import { Idea } from '@/types/idea';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import {
  MessageCircle,
  Leaf,
  ArrowRight,
  Heart,
  HeartOff,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  FileText,
  Gem,
  User,
  CalendarDays,
} from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import IdeaCardCarousel from './IdeaCardCarosule';
import { createPayment } from '@/services/Payment';
import IdeaActionSkeleton from './IdeaActionSkelletion';

const IdeaCard = ({ idea }: { idea: Idea }) => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handlePayment = async (id: string) => {
    try {
      const res = await createPayment({ ideaId: id });

      if (res.success && res.data) {
        router.push(res.data);
      } else {
        console.error('Payment initiation failed:', res.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <Card className="bg-white dark:bg-transparent rounded-3xl border-2 border-[#14B8A6] shadow-lg hover:shadow-xl transition-shadow relative">
   

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-2">
        <div className="lg:h-full relative aspect-video lg:aspect-auto">
          <CardHeader className="relative h-full w-full p-0 overflow-hidden rounded-xl">
            <IdeaCardCarousel idea={idea} />

            <div className="flex justify-around items-center">
              <div className="flex items-center gap-1 dark:text-[#14B8A6] text-[#14B8A6] mt-1">
                <User className="w-4 h-4" />
                <span>{idea?.author?.name}</span>
              </div>

              <div className="flex items-center gap-1 dark:text-[#14B8A6] text-[#14B8A6]">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(idea?.createdAt)?.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="absolute top-2 left-1 flex items-center gap-1.5 backdrop-blur-sm text-[#14B8A6] px-3 py-1 rounded-full z-10 border border-[#14B8A6] bg-[#14B8A6]/50 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm font-medium">
                {idea.comments?.length || 0}
              </span>
            </div>

            <div className="absolute top-2 left-16 flex items-center gap-1.5 backdrop-blur-sm text-[#14B8A6] px-3 py-1 rounded-full z-10 border border-[#14B8A6] bg-[#14B8A6]/50 transition-colors">
              <Heart className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm font-medium">
                {idea.votes?.filter(vote => vote.type === 'UP')?.length || 0}
              </span>
            </div>

            <div className="absolute top-2 left-32 flex items-center gap-1.5 backdrop-blur-sm text-[#14B8A6] px-3 py-1 rounded-full z-10 border border-[#14B8A6] bg-[#14B8A6]/50 transition-colors">
              <HeartOff className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">
                {idea.votes?.filter(vote => vote.type === 'DOWN')?.length || 0}
              </span>
            </div>
          </CardHeader>
        </div>

        <div className="flex flex-col justify-between lg:h-full lg:pl-4">
          <CardContent className="p-0 space-y-4">
            <CardTitle className="space-y-2">
              <h1 className="text-xl font-bold text-[#14B8A6] dark:text-[#14B8A6] leading-tight">
                {idea.title}
              </h1>
            </CardTitle>

            <div className="relative">
              <p className="text-gray-600 text-sm dark:text-[#14B8A6] line-clamp-3">
                {idea.description}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-4">
            <div className="w-full flex flex-col gap-4">
              <div className="flex md:flex-col justify-around items-center gap-3">
                <div className="flex items-center gap-2 bg-[#14B8A6]/10 px-4 py-1 rounded-full">
                  <Leaf className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-sm font-medium text-[#14B8A6]">
                    {idea?.category?.name}
                  </span>
                </div>
                <div className="bg-[#14B8A6]/20 px-4 py-1 rounded-full">
                  <span className="text-lg font-medium text-[#14B8A6]">
                    {idea.isPaid ? <>${idea.price?.toFixed(2)}</> : 'Free'}
                  </span>
                </div>
              </div>

              {isLoading ? (
                <IdeaActionSkeleton />
              ) : (
                <>
                  <Link
                    href={`/idea/${idea.id}`}
                    className="w-full"
                    onClick={e => {
                      if (idea.isPaid && user) {
                        const hasValidPayment = idea.payments?.some(
                          p =>
                            p.ideaId === idea.id &&
                            p.userEmail?.toLowerCase() ===
                              user?.email?.toLowerCase() &&
                            p.status === 'Paid'
                        );

                        if (!hasValidPayment) {
                          e.preventDefault();
                          setIsModalOpen(true);
                        }
                      }

                      if (idea.isPaid && !user) {
                        e.preventDefault();
                        window.location.href = `/login?returnUrl=${encodeURIComponent(
                          `/idea/${idea.id}`
                        )}`;
                      }
                    }}
                  >
                    <Button
                      size="lg"
                      className="w-full cursor-pointer bg-[#14B8A6] hover:bg-[#119B92] text-white font-semibold rounded-xl py-2"
                    >
                      {idea.isPaid ? 'Premium Solution' : 'Detailed Solution'}
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>

                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="rounded-lg max-w-md">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-gradient-to-r from-[#14B8A6] to-emerald-500 rounded-full animate-pulse">
                          <Gem className="w-8 h-8 text-white" />
                        </div>

                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                            Unlock Premium Wisdom
                          </DialogTitle>
                          <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                            This golden idea is waiting to be fully discovered!
                          </DialogDescription>
                        </DialogHeader>

                        <div className="w-full space-y-3 text-left">
                          <div className="flex items-center gap-3 p-3 bg-[#14B8A6]/10 dark:bg-[#14B8A6]/20 rounded-lg">
                            <FileText className="w-5 h-5 text-[#14B8A6]" />
                            <span className="text-sm font-medium">
                              Detailed Step-by-Step Guide
                            </span>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-medium">
                              Exclusive Implementation Strategies
                            </span>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium">
                              Priority Support Access
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-gradient-to-r from-[#14B8A6] to-emerald-600 text-white p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xl font-bold">
                                ${idea.price}{' '}
                                <span className="text-sm font-normal">
                                  / lifetime access
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-2 space-y-2">
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-[#14B8A6] to-emerald-600 hover:from-[#14B8A6] hover:to-emerald-700 text-white font-bold shadow-lg"
                            onClick={() => {
                              setIsModalOpen(false);
                              handlePayment(idea.id);
                            }}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Get Instant Access
                          </Button>

                          <Button
                            className="w-full text-[#14B8A6] bg-[#14B8A6]/10 dark:text-gray-600"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Maybe Later
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
