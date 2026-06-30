import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course, Instructor, Comment, User } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      {
        model: Instructor,
        as: 'instructor',
        attributes: ['id', 'name', 'mobile', 'bio', 'website'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment', 'status', 'createdAt'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email'],
          },
        ],
      },
    ],
  });

  if (!course) throw new NotFoundError('course not found');

  return res.status(200).json({
    success: true,
    course,
  });
});
