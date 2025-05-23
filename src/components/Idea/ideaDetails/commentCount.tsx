// /* eslint-disable @typescript-eslint/no-explicit-any */
// export function countAllComments(comments: any[]): number {
//     let count = 0;
  
//     const countReplies = (replies: any[]) => {
//       for (const reply of replies) {
//         count++;
//         if (reply.replies && reply.replies.length > 0) {
//           countReplies(reply.replies);
//         }
//       }
//     };
  
//     for (const comment of comments) {
//       count++; // count the top-level comment
//       if (comment.replies && comment.replies.length > 0) {
//         countReplies(comment.replies);
//       }
//     }
  
//     return count;
//   }

interface Comment {
  id: string;
  replies?: Comment[];
  // Add other comment properties as needed
}

export function countAllComments(comments: Comment[]): number {
  if (!Array.isArray(comments)) {
    return 0;
  }

  let count = 0;

  const countReplies = (replies: Comment[]) => {
    replies.forEach((reply) => {
      count++;
      if (reply.replies?.length) {
        countReplies(reply.replies);
      }
    });
  };

  comments.forEach((comment) => {
    count++;
    if (comment.replies?.length) {
      countReplies(comment.replies);
    }
  });

  return count;
}