import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';

export const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.userId, {
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
