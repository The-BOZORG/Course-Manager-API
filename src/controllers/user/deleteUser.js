import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/associations.js';
import { NotFoundError } from '../../errors/notFound.js';
import { checkPermissions } from '../../utils/checkPermissions.js';

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError('User not found');

  checkPermissions(req.user, user.id);

  await user.destroy();

  logger.info(`User with id: ${id} deleted`);

  res.status(200).json({
    success: true,
    message: 'user deleted successfully',
  });
});
