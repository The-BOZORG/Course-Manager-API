import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Course } from '../../models/course.js';
import { User } from '../../models/user.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { NotFoundError } from '../../errors/notFound.js';

import { logger } from '../../utils/logger.js';

export const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.userId;

  if (!comment) throw new BadRequestError('comment required', 400);

  const newComment = await Comment.create({
    comment,
    courseId,
    userId,
  });

  logger.info('create comment success');

  return res.status(201).json({
    success: true,
    message: 'create comment success',
    data: newComment,
  });
});
