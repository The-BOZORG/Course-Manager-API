import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;

  const total = await User.count();

  const users = await User.findAll({
    where: { role: 'user' },
    attributes: {
      exclude: ['password'],
    },
    limit,
    offset,
  });

  if (!users.length) throw new NotFoundError('No users found');

  res.status(200).json({
    success: true,
    total,
    count: users.length,
    limit,
    offset,
    users,
  });
});
