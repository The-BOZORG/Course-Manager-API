import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) throw new NotFoundError('User not found');

  res.status(200).json({
    success: true,
    user,
  });
});
