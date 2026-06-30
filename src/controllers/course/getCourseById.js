import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new NotFoundError('course not found');

  return res.status(200).json({
    success: true,
    course,
  });
});
