import { z } from 'zod';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'username must be at least 3 characters')
    .max(30, 'username cannot more than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Only letters, numbers and underscore are allowed',
    ),

  email: z.email('invalid email address').toLowerCase(),

  password: z
    .string()
    .min(6, 'password must more tha 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase and number',
    ),
});

const updateSchema = z.object({
  username: z.string().min(3).max(30).optional(),

  email: z.email().toLowerCase().optional(),

  password: z.string().min(6).optional(),
});
