import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { NotFoundError } from '../../errors/notFound.js';
import { logger } from '../../utils/logger.js';

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new NotFoundError('course not found', 404);

  await course.update(req.body);

  logger.info(`course with id:${req.params.id} updated`);

  return res.status(200).json({
    message: 'Course updated successfully',
    data: course,
  });
});
