import { rateLimit } from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  standardHeaders: true, //Ratelimit header
  legacyHeaders: false, //X-Rate-Limit header

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.',
    });
  },
});

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Try again in 5 minutes.',
    });
  },
});

export const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many registration attempts. Try again later.',
    });
  },
});
