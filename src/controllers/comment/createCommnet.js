import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { logger } from '../../utils/logger.js';

export const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.userId;

  if (!comment?.trim()) throw new BadRequestError('comment required', 400);

  const newComment = await Comment.create({
    comment: comment.trim(),
    userId,
  });

  logger.info(`User ${userId} created a comment`);

  return res.status(201).json({
    success: true,
    message: 'create comment success',
    data: newComment,
  });
});
