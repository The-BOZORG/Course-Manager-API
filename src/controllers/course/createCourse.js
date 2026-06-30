import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { NotFoundError } from '../../errors/notFound.js';

import { logger } from '../../utils/logger.js';

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, currency } = req.body;

  if (!title || !description || price === undefined)
    throw new BadRequestError('All fields are required', 400);

  const course = await Course.create({
    title,
    description,
    price,
    currency,
  });

  logger.info(`${title} Course created successfully`);

  return res.status(201).json({
    success: true,
    course: courseWithInstructor,
  });
});
