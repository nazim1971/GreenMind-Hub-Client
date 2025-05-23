export interface Idea {
    id: string;
    title: string;
    problemStatement?: string;
    solution?: string;
    description?: string;
    images: string[]; // Array of image URLs
    isPaid: boolean;
    price?: number; // Only present if isPaid is true
    status: IdeaStatus;
    feedback?: string; // Rejection reason from admin
    categoryId?: string;
    authorId: string;
    isDeleted: boolean;
    category?: Category;
    author: User;
    votes: Vote[];
    comments: Comment[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Related interfaces
  interface Category {
    id: string;
    name: string;
    description?: string;
    ideas?: Idea[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User {
    id: string;
    // Include other user fields you need
    name: string;
    email: string;
    role: 'MEMBER' | 'ADMIN';
    image?: string;
    ideas?: Idea[];
    votes?: Vote[];
    comments?: Comment[];
    payments?: Payment[];
  }
  
  interface Vote {
    id: string;
    value: number;
    userEmail: string;
    ideaId: string;
    type?: string;
    user?: User;
    idea?: Idea;
    createdAt: Date;
  }
  
  export interface Comment {
    id: string;
    content: string;
    userId: string;
    ideaId: string;
    parentId?: string; // For nested comments
    user?: User;
    idea?: Idea;
    parent?: Comment;
    replies?: Comment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Payment {
    id: string;
    amount: number;
    userEmail: string;
    ideaId: string;
    transactionId: string;
    status: PaymentStatus;
    user?: User;
    idea?: Idea;
    createdAt: Date;
  }
  
  // Enums
  export enum IdeaStatus {
    DRAFT = "DRAFT",
    UNDER_REVIEW = "UNDER_REVIEW",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
  }
  
  enum PaymentStatus {
    PAID = "Paid",
    PENDING = "Pending",
    COMPLETED = "Completed",
    FAILED = "Failed",
    REFUNDED = "Refund",
  }