import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/associations.js';

export const getCourse = asyncHandler(async (req, res) => {
  const courses = await Course.findAll();

  return res.status(200).json({
    success: true,
    courses,
  });
});
