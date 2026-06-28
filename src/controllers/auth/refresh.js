import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { UnauthenticatedError } from '../../errors/unauthenticated.js';
import {
  payloadToken,
  createAccessToken,
  verifyRefreshToken,
} from '../../utils/jwt.js';

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;

  if (!refreshToken) throw new UnauthenticatedError('auth invalid', 401);

  const { userId } = verifyRefreshToken(refreshToken);

  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'role'],
  });

  if (!user) {
    throw new UnauthenticatedError('auth invalid', 401);
  }

  const payload = payloadToken(user);
  const accessToken = createAccessToken(payload);

  res.status(200).json({
    accessToken,
  });

  logger.info('Access token refreshed', {
    id: user.id,
    email: user.email,
  });
});
