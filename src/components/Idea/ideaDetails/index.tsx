/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Leaf,
  DollarSign,
  ShieldCheck,
  MessageCircle,
  Heart,
  HeartOff,
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
    <div className="mx-auto lg:px-8 py-8 ">
      <div className="rounded-3xl shadow-xl overflow-hidden">
        <div className="relative h-96 bg-gray-100">
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {idea.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-96 w-full">
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

          <div className="absolute bottom-4 right-4  flex items-center gap-2 ">
            <div className="flex bg-white/90 backdrop-blur-sm  px-3 md:px-4 py-2 rounded-full shadow-sm items-center gap-2">
             
              <span className="font-medium text-green-700">
                {idea.category?.name}
              </span>
            </div>
            <div className="flex bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                {/* {idea.comments?.length || 0} */}
                {countAllComments(idea.comments)}
              </span>
            </div>

            <div className="flex bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 text-green-700 rounded-full shadow-sm items-center gap-2">
              <Heart className="w-4 h-4 text-green-900" />
              <span className="text-sm font-medium">
                {idea.votes?.filter(vote => vote.type === 'UP')?.length || 0}
              </span>
            </div>
            <div className="flex bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 text-red-700 rounded-full shadow-sm items-center gap-2">
              <HeartOff className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">
                {idea.votes?.filter(vote => vote.type === 'DOWN')?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className=" p-2 md:p-8 lg:p-12 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-green-200">
                {idea.title}
              </h1>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Problem Section */}
              <div className="p-6 bg-green-50 rounded-xl dark:bg-transparent border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-green-400">
                    The Challenge
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed dark:text-white text-lg">
                  {idea.problemStatement}
                </p>
              </div>

              {/* Solution Section */}
              <div className="p-6 bg-green-50 dark:bg-transparent  rounded-xl border border-green-100 ">
                <div className="flex items-center gap-3 mb-4">
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-green-400">
                    Proposed Solution
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed dark:text-white text-lg">
                  {idea.solution}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border dark:bg-transparent border-green-100">
                <h3 className="text-xl font-bold dark:text-green-400 text-gray-900 mb-4">
                  Detailed Implementation
                </h3>
                <p className="text-gray-600 dark:text-white leading-relaxed">
                  {idea.description}
                </p>
              </div>
              <div className="mb-8">
                <CommentForm onSubmit={content => handleAddComment(content)} />
              </div>

              <div className="space-y-6">
                {comments.filter(c => !c.parentId)?.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl border dark:bg-transparent border-green-200">
              <div className="flex items-center justify-center gap-2">
                {/* Upvote button */}
                <button
                  onClick={() => {
                    const existingVote = idea.votes?.find(
                      p =>
                        p.ideaId === idea.id &&
                        p.userEmail === user?.email &&
                        p.type === 'UP'
                    );

                    if (existingVote) {
                      // If vote exists, delete it
                      handleDeleteVote(idea.id);
                    } else {
                      // If no vote exists, create UP vote
                      handleVote('UP');
                    }
                  }}
                  className={`p-2 rounded-md transition-colors ${
                    idea.votes?.some(
                      p =>
                        p.ideaId === idea.id &&
                        p.userEmail === user?.email &&
                        p.type === 'UP'
                    )
                      ? 'bg-green-100'
                      : 'text-gray-600 hover:bg-green-100'
                  }`}
                >
                  <Heart className="w-8 h-8 cursor-pointer text-green-600" />
                </button>

                {/* Downvote button */}
                <button
                  onClick={() => {
                    const existingVote = idea.votes?.find(
                      p =>
                        p.ideaId === idea.id &&
                        p.userEmail === user?.email &&
                        p.type === 'DOWN'
                    );

                    if (existingVote) {
                      // If downvote exists, delete it
                      handleDeleteVote(idea.id);
                    } else {
                      // If no downvote exists, create DOWN vote
                      handleVote('DOWN');
                    }
                  }}
                  className={`p-2 rounded-md transition-colors ${
                    idea.votes?.some(
                      p =>
                        p.ideaId === idea.id &&
                        p.userEmail === user?.email &&
                        p.type === 'DOWN'
                    )
                      ? 'bg-red-100'
                      : 'text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <HeartOff className="w-8 h-8 cursor-pointer text-red-600" />
                </button>
              </div>
            </div>
            {idea.isPaid ? (
              <div className="bg-green-50 p-6 rounded-xl border dark:bg-transparent border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
                    Premium Solution
                  </h3>
                </div>

                <div className="text-center p-4 bg-green-100 dark:bg-transparent  rounded-lg">
                  <p className="text-green-700 dark:text-green-300 font-medium">
                    ✅ Full Access Granted
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-transparent p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
                    Community Solution
                  </h3>
                </div>
                <div className="text-center p-4 bg-green-100 dark:bg-transparent rounded-lg">
                  <p className="text-green-700 dark:text-green-300 font-medium">
                   Open Access - Collaborate & Contribute!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;

const CommentList = ({ comment, onReply }: CommentListProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useUser();
  // const userName = comment.user?.name || 'Anonymous';

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
    <div className="ml-4 mt-4 border-l-2 border-green-100 pl-4">
      {/* Comment Header */}
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center overflow-hidden">
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

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="text-sm font-medium text-gray-900 dark:text-green-400 w-1/4 flex justify-between">
            {comment?.user?.name || 'Anonymous'}

            {/* Comment Delete Section */}
            {user && user?.role === 'ADMIN' && (
              <div className="relative inline-block text-left">
                {/* Three Dot Button for DELETE*/}
                <div
                  className="cursor-pointer p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <div className="flex flex-col items-center justify-center space-y-0.5">
                    <span className="w-[2px] h-[2px] bg-black dark:bg-gray-200 rounded-full"></span>
                    <span className="w-[2px] h-[2px] bg-black dark:bg-gray-200 rounded-full"></span>
                    <span className="w-[2px] h-[2px] bg-black dark:bg-gray-200 rounded-full"></span>
                  </div>
                </div>

                {/* DELETE Dropdown Option */}
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-32 border rounded-lg shadow-lg z-10">
                    <Button
                      className="w-full px-4 py-2 text-left rounded-lg bg-red-500 text-white hover:bg-red-50 hover:text-red-500"
                      onClick={() => {
                        setShowConfirmModal(true);
                        setShowOptions(false);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                )}

                {/* DELETE Confirmation Modal */}
                {showConfirmModal && (
                  <Dialog
                    open={showConfirmModal}
                    onOpenChange={setShowConfirmModal}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this comment? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          className="px-4 py-2 bg-black text-white hover:bg-gray-400 hover:text-black dark:bg-gray-400 dark:text-black dark:hover:bg-gray-600 dark:hover:text-gray-200 rounded-lg"
                          onClick={() => setShowConfirmModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 hover:text-black"
                          onClick={() => {
                            handleConfirmCommentDelete(comment.id);
                            setShowConfirmModal(false);
                          }}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-white mt-1">
            {comment?.content}
          </div>

          {/* Comment Actions */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm text-green-600 hover:text-green-700"
            >
              Reply
            </button>
            <span className="text-sm text-gray-400">
              {new Date(comment?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Reply Form */}
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

      {/* Nested Replies */}
      {comment.replies?.map(reply => (
        <CommentList key={reply.id} comment={reply} onReply={onReply} />
      ))}
    </div>
  );
};

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
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="Write your comment..."
        rows={3}
        required
      />
      <div className="mt-2 flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};