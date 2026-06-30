import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { NotFoundError } from '../../errors/notFound.js';
import { logger } from '../../utils/logger.js';

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new NotFoundError('course not found', 404);

  const { title, description, price, currency, instructorId } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  if (currency !== undefined) updateData.currency = currency;

  if (!Object.keys(updateData).length)
    throw new BadRequestError('provide at least one field to update', 400);

  await course.update(updateData);

  const updatedCourse = await Course.findByPk(course.id, {
    include: [
      {
        model: Instructor,
        as: 'instructor',
        attributes: ['id', 'name', 'mobile', 'bio', 'website'],
      },
    ],
  });

  logger.info(`course with id:${req.params.id} updated`);

  return res.status(200).json({
    success: true,
    course: updatedCourse,
  });
});
