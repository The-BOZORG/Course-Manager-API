import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username'],
      },
    ],
  });

  if (!comment) throw new NotFoundError('comment not found', 404);

  return res.status(201).json({
    success: true,
    message: 'create comment success',
    data: comment,
  });
});
