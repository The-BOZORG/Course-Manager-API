import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { logger } from '../../utils/logger.js';

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new BadRequestError('course not found', 400);

  await course.destroy();

  logger.info(`course with id:${req.params.id} deleted`);

  return res.status(200).json({
    success: true,
    course,
  });
});
