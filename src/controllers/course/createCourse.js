import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course, Instructor } from '../../models/associations.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { NotFoundError } from '../../errors/notFound.js';

import { logger } from '../../utils/logger.js';

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, currency } = req.body;
  const instructorId = req.user.id;

  if (!title || !description || price === undefined)
    throw new BadRequestError('All fields are required', 400);

  const instructor = await Instructor.findByPk(instructorId, {
    attributes: ['id'],
  });

  if (!instructor) throw new BadRequestError('instructor not found', 404);

  const course = await Course.create({
    title,
    description,
    price,
    currency,
    instructorId,
  });

  const courseWithInstructor = await Course.findByPk(course.id, {
    include: [
      {
        model: Instructor,
        as: 'instructor',
        attributes: ['id', 'name', 'mobile', 'bio', 'website'],
      },
    ],
  });

  logger.info(`${title} Course created successfully`);

  return res.status(201).json({
    success: true,
    course: courseWithInstructor,
  });
});
