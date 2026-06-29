import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { logger } from '../../utils/logger.js';

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, currency } = req.body;

  const course = await Course.create({
    title,
    description,
    price,
    currency,
  });

  if (!title || !description || !price)
    throw new BadRequestError('All fields are required', 400);

  logger.info(`${title} Course created successfully`);

  return res.status(201).json({
    success: true,
    course,
  });
});
