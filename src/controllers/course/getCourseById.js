import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';
import { BadRequestError } from '../../errors/badRequest.js';

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (!course) throw new BadRequestError('course not found', 400);

  return res.status(200).json({
    success: true,
    course,
  });
});
