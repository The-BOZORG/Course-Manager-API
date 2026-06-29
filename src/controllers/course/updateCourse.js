import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { logger } from '../../utils/logger.js';

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new BadRequestError('course not found', 400);

  const updateCourse = await Course.update(req.body);

  logger.info(`course with id:${req.params.id} updated`);

  return res.status(200).json({
    success: true,
    updateCourse,
  });
});
