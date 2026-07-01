import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { NotFoundError } from '../../errors/notFound.js';

export const pendingComment = asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      status: 'pending',
    },
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});
