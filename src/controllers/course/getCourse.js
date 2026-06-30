import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course, Instructor, Comment } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getCourse = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment', 'status', 'userId', 'createdAt'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (!courses.length) throw new NotFoundError('No courses found', 404);

  return res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});
