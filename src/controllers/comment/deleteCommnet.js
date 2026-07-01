import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { NotFoundError } from '../../errors/notFound.js';
import { logger } from '../../utils/logger.js';

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) throw new NotFoundError('comment not found', 404);

  await comment.destroy();

  logger.info(`Comment ${comment.id} deleted`);

  return res.status(200).json({
    success: true,
    message: 'delete comment success',
  });
});
