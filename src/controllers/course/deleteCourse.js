import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';
import { logger } from '../../utils/logger.js';

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new NotFoundError('course not found', 404);

  await course.destroy();

  logger.info(`course with id:${req.params.id} deleted`);

  return res.status(200).json({
    success: true,
    msg: 'course deleted successfully',
  });
});
