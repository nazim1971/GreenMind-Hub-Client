/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  DollarSign,
  ShieldCheck,
  MessageCircle,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Comment, Idea } from '@/types/idea';
import { useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';
import {
  createComment,
  createVote,
  deleteComment,
  deleteVote,
} from '@/services/Idea';
import { toast } from 'sonner';
import { countAllComments } from './commentCount';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface CommentListProps {
  comment: Comment;
  onReply: (content: string, parentId: string) => void;
}
interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => void;
  onCancel?: () => void;
  parentId?: string;
}

const IdeaDetail = ({ idea }: { idea: Idea }) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [comments, setComments] = useState<Comment[]>(idea.comments || []);
  const { user } = useUser();

  const handleVote = async (direction: 'UP' | 'DOWN') => {
    if (!user) {
      return toast.error('Please login to your account!');
    }
    const payload = {
      ideaId: idea.id,
      type: direction,
    };
    const res = await createVote(payload);
    if (res.success) {
      toast.success('Thanks for your vote!');
    }
  };

  const handleDeleteVote = async (id: string) => {
    const res = await deleteVote(id);
    if (res.success) {
      toast.success('Your vote is removed!');
    }
  };

  const handleAddComment = async (content: string, parentId?: string) => {
    if (!user) {
      return toast.error('Please login to your account!');
    }
    try {
      const payload = {
        content,
        ideaId: idea.id,
        ...(parentId ? { parentId } : {}),
      };

      const res = await createComment(payload);
      if (res.success) {
        toast.success(res?.message);

        setComments(prev => {
          if (parentId) {
            return (
              prev?.map(comment =>
                comment?.id === parentId
                  ? {
                      ...comment,
                      replies: [...(comment?.replies || []), res.data],
                    }
                  : comment
              ) || []
            );
          }
          return [res.data, ...(prev || [])];
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* New Layout Structure */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Voting */}
       <div className="lg:w-24 flex-shrink-0">
  <div className="sticky top-6 flex lg:flex-col items-center justify-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
    {/* Upvote Button */}
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          const existingVote = idea.votes?.find(
            p => p.ideaId === idea.id && p.userEmail === user?.email && p.type === 'UP'
          );
          if (existingVote) {
            handleDeleteVote(idea.id);
          } else {
            handleVote('UP');
          }
        }}
        className={`p-2 rounded-full transition-all duration-200 ${
          idea.votes?.some(p => p.ideaId === idea.id && p.userEmail === user?.email && p.type === 'UP')
            ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-md'
            : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-emerald-500 dark:hover:text-emerald-400'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
     
    </div>

    {/* Vote Count */}
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-gray-800 dark:text-white px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800">
        {(idea.votes?.filter(vote => vote.type === 'UP')?.length || 0)}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Like</span>
    </div>

     {/* Vote Count */}
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-gray-800 dark:text-white px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800">
        { (idea.votes?.filter(vote => vote.type === 'DOWN')?.length || 0)}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Dislike</span>
    </div>

    {/* Downvote Button */}
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          const existingVote = idea.votes?.find(
            p => p.ideaId === idea.id && p.userEmail === user?.email && p.type === 'DOWN'
          );
          if (existingVote) {
            handleDeleteVote(idea.id);
          } else {
            handleVote('DOWN');
          }
        }}
        className={`p-2 rounded-full transition-all duration-200 ${
          idea.votes?.some(p => p.ideaId === idea.id && p.userEmail === user?.email && p.type === 'DOWN')
            ? 'bg-rose-50 text-rose-600 shadow-rose-100 dark:bg-rose-900/20 dark:text-rose-400 shadow-md'
            : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-rose-500 dark:hover:text-rose-400'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </button>
      
    </div>
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-sm">
                {idea.category?.name}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>{countAllComments(idea.comments)} comments</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {idea.title}
            </h1>
            
            {/* Image Carousel */}
            <div className="relative rounded-xl overflow-hidden mb-8">
              <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {idea.images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={img}
                          fill
                          alt={`Slide ${idx + 1}`}
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Problem Section */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  The Challenge
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {idea.problemStatement}
              </p>
            </section>

            {/* Solution Section */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Proposed Solution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {idea.solution}
              </p>
            </section>

            {/* Implementation Section */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Implementation Details
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {idea.description}
              </p>
            </section>

            {/* Access Badge - Mobile Only */}
            <div className="lg:hidden bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              {idea.isPaid ? (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-medium">Premium Solution</span>
                  <Badge className="ml-auto">Full Access</Badge>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-medium">Community Solution</span>
                  <Badge variant="outline" className="ml-auto">Open Access</Badge>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Discussion ({countAllComments(idea.comments)})
              </h2>
              
              <CommentForm onSubmit={content => handleAddComment(content)} />
              
              <div className="mt-8 space-y-6">
                {comments.filter(c => !c.parentId)?.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments
                    .filter(c => !c.parentId)
                    .map(comment => (
                      <CommentList
                        key={comment.id}
                        comment={comment}
                        onReply={handleAddComment}
                      />
                    ))
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-4">
            {idea.isPaid ? (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Premium Solution
                  </h3>
                </div>
                <Badge className="w-full justify-center">Full Access Granted</Badge>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Community Solution
                </h3>
                <Badge variant="outline" className="w-full justify-center">
                  Open for Collaboration
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// CommentList Component (updated styling only)
const CommentList = ({ comment, onReply }: CommentListProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useUser();

  const handleConfirmCommentDelete = async (commentId: string) => {
    try {
      const res = await deleteComment(commentId);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to delete comment!');
    }
  };

  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center overflow-hidden">
            {comment?.user?.image ? (
              <Image
                src={comment?.user?.image}
                alt={comment?.user?.name}
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            ) : (
              comment?.user?.name?.[0]?.toUpperCase() || 'A'
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {comment?.user?.name || 'Anonymous'}
            </span>
            
            {user && user?.role === 'ADMIN' && (
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setShowConfirmModal(true);
                        setShowOptions(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Delete Comment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {comment?.content}
          </p>
          
          <div className="flex items-center gap-3 mt-2 text-sm">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Reply
            </button>
            <span className="text-gray-500 dark:text-gray-500">
              {new Date(comment?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          
          {isReplying && (
            <div className="mt-3">
              <CommentForm
                onSubmit={content => {
                  onReply(content, comment.id);
                  setIsReplying(false);
                }}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Replies */}
      <div className="mt-4 space-y-4">
        {comment.replies?.map(reply => (
          <CommentList key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                handleConfirmCommentDelete(comment.id);
                setShowConfirmModal(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// CommentForm Component (updated styling only)
const CommentForm = ({ onSubmit, onCancel, parentId }: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, parentId || undefined);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        placeholder="Write your comment..."
        rows={3}
        required
      />
      <div className="mt-3 flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default IdeaDetail;