import { z } from 'zod';

export const ideaCreationSchema = z.object({
  id: z
    .string({
      required_error: '',
    })
    .optional(),

  title: z
    .string({ required_error: 'Title is required!' })
    .trim()
    .min(10, { message: 'Title must have minimum 10 characters!' })
    .max(60, { message: "Title can't exceed 60 characters!" }),

  problemStatement: z
    .string({ required_error: 'Problem Statement is required!' })
    .trim()
    .min(15, 'Problem statement must be at least 15 characters!'),

  solution: z
    .string({ required_error: 'Solution is required!' })
    .trim()
    .min(20, 'Solution must be at least 20 characters long!'),

  description: z
    .string({ required_error: 'Description Statement is required!' })
    .trim()
    .min(20, 'Description must be 20 characters long!'),

  price: z
    .number({ required_error: 'Price is required!' })
    .nonnegative('Price is must a positive value!'),

  categoryId: z.string({
    required_error: 'Must select a category!',
  }),
});

export const ideaDraftSchema = z.object({
  id: z
    .string({
      required_error: '',
    })
    .optional(),

  title: z
    .string({ required_error: 'Title is required!' })
    .trim()
    .min(10, { message: 'Title must have minimum 10 characters!' })
    .max(60, { message: "Title can't exceed 60 characters!" }),

  problemStatement: z
    .string({ required_error: 'Problem Statement is required!' })
    .trim()
    .min(15, 'Problem statement must be at least 15 characters!')
    .optional(),

  solution: z
    .string({ required_error: 'Solution is required!' })
    .trim()
    .min(20, 'Solution must be at least 20 characters long!')
    .optional(),

  description: z
    .string({ required_error: 'Description Statement is required!' })
    .trim()
    .min(20, 'Description must be 20 characters long!')
    .optional(),

  price: z
    .number({ required_error: 'Price is required!' })
    .nonnegative('Price is must a positive value!')
    .optional(),

  categoryId: z
    .string({
      required_error: 'Must select a category!',
    })
    .optional(),
});