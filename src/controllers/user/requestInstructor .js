import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const requestInstructor = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) throw new NotFoundError('user not found', 404);

  if (user.role === 'instructor') {
    return res.status(400).json({
      success: false,
      message: 'You are already an instructor',
    });
  }

  if (user.instructorRequest === 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Your request is already pending',
    });
  }

  user.instructorRequest = 'pending';

  await user.save();

  logger.info(`instructor request with id:${req.user.id} submitted `);

  return res.status(200).json({
    success: true,
    message: 'instructor request submitted success',
  });
});
