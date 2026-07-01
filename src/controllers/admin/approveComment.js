import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { Comment } from '../../models/comment.js';
import { NotFoundError } from '../../errors/notFound.js';

export const changeRole = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) throw new NotFoundError('user not found', 404);

  comment.status = 'approve';

  await comment.save();

  logger.info(`comment with id:${req.params.id} approve success`);

  return res.status(200).json({
    success: true,
    message: 'comment approve success',
    data: user,
  });
});
