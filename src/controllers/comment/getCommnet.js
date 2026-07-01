import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { User } from '../../models/user.js';

export const getComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const where = {
    userId: req.user.userId,
  };

  const offset = (Number(page) - 1) * Number(limit);

  const { count, rows } = await Comment.findAndCountAll({
    where,
    limit: Number(limit),
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email'],
      },
    ],
  });

  return res.status(200).json({
    success: true,
    data: rows,
    pagination: {
      total: count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(count / Number(limit)),
    },
  });
});
