import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';

export const changeRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findByPk(req.params.id);

  if (!user) throw new NotFoundError('user not found', 404);

  user.role = role;
  await user.save();

  logger.info(`user with id:${req.params.id} changed success`);

  return res.status(200).json({
    success: true,
    message: 'User role updated success',
    data: user,
  });
});
