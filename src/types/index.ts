/* eslint-disable @typescript-eslint/no-explicit-any */

export * from "./user";
export type TIdea = {
  id: string;
  title: string;
  problemStatement: string;
  solution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price: number;
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "DRAFT";
  feedback: string | null;
  categoryId: string;
  authorId: string;
  category: category;
  author: author;
  votes?: vote[];
  comments?: comment[];
  payments?: payment[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
type vote = {
  id: string;
  userEmail: string;
  ideaId: string;
  type: "UP" | "DOWN";
  user: TUser;
  idea: TIdea;
};
type author = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt: any;
  image: string | null;
  role: "MEMBER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type category = {
  id: string;
  name: string;
  createdAt: string;
};

type comment = {
  id: string;
  content: string;
  ideaId: string;
  userId: string;
  parentId?: string;
  idea: TIdea;
  user: TUser;
  parent?: comment;
  replies: comment[];
  createdAt: string;
  updatedAt: string;
};

type payment = {
  id: string;
  userId: string;
  ideaId: string;
  user: TUser;
  idea: TIdea;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  transactionId: string;
  gatewayResponse?: any;
  createdAt: string;
};
export type ITransaction = {
  id: string;
  userEmail: string;
  ideaId: string;
  amount: number;
  status: string;
  transactionId: string;
  gatewayResponse: {
    error: string;
    amount: string;
    status: string;
    val_id: string;
    bank_gw: string;
    card_no: string;
    tran_id: string;
    value_a: string;
    value_b: string;
    value_c: string;
    value_d: string;
    currency: string;
    base_fair: string;
    card_type: string;
    tran_date: string;
    card_brand: string;
    emi_amount: string;
    emi_issuer: string;
    gw_version: string;
    risk_level: string;
    risk_title: string;
    card_issuer: string;
    bank_tran_id: string;
    store_amount: string;
    validated_on: string;
    currency_rate: string;
    currency_type: string;
    emi_instalment: string;
    currency_amount: string;
    discount_amount: number;
    emi_description: string;
    discount_remarks: string;
    card_issuer_country: string;
    discount_percentage: string;
    card_issuer_country_code: string;
  };
  createdAt: string;
};

export type DynamicPageProps = {
  params: {
    id: string;
  };
};

// Define types for the nested objects
type Payment = {
  id: string;
  userId: string;
  ideaId: string;
  amount: number;
  status: string;
  transactionId: string;
  gatewayResponse: any;
  createdAt: string;
};

type Idea = {
  id: string;
  title: string;
  problemStatement: string;
  solution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price: number;
  status: string;
  feedback: string | null;
  categoryId: string;
  authorId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// Define the User type
export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt: string | null;
  image: string | null;
  role: "MEMBER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  votes: any[];
  payments: Payment[];
  comments: any[];
  ideas: Idea[];
};
