import { z } from "zod";
export const registrationValidationSchema = z.object({
  name: z
    .string({ required_error: "User Name is Required" })
    .min(2, "Minimum 2 Charecter Required"),
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email"),
  password: z.string({
    required_error: "Required Password",
  }),
});