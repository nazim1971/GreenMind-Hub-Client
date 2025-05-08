export type TUser = {
    name: string;
    email: string;
    image: string;
    role: "MEMBER" | "ADMIN";
    iat?: number;
    exp?: number;
  }