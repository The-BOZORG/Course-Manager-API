import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const approveInstructorRequest = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) throw new NotFoundError('user not found', 404);

  user.role = 'instructor';
  user.instructorRequest = 'approved';

  await user.save();

  logger.info(`instructor request with id:${req.user.id} approved `);

  return res.status(200).json({
    success: true,
    message: 'instructor request approve success',
  });
});
