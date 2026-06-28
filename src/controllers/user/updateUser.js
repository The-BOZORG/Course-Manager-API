import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { NotFoundError } from '../../errors/notFound.js';
import { checkPermissions } from '../../utils/checkPermissions.js';

export const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError('User not found');

  checkPermissions(req.user, user.id);

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  await user.save();

  const userData = user.toJSON();
  delete userData.password;

  logger.info('user update success!', user);

  res.status(200).json({
    success: true,
    user: userData,
  });
});
