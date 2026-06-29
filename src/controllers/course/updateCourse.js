import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { BadRequestError } from '../../errors/badRequest.js';

export const getUpdateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new BadRequestError('course not found', 400);

  const updateCourse = await Course.update(req.body);

  return res.status(200).json({
    success: true,
    updateCourse,
  });
});
