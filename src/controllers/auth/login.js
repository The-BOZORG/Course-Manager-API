import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { BadRequestError } from '../../errors/badRequest.js';
import { UnauthenticatedError } from '../../errors/unauthenticated.js';
import {
  attachCookie,
  payloadToken,
  createAccessToken,
  createRefreshToken,
} from '../../utils/jwt.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('provide email or password', 400);

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) throw new UnauthenticatedError('invalid login', 401);

  const validPassword = await user.comparePassword(password);
  if (!validPassword) throw new UnauthenticatedError('invalid login', 401);

  const payload = payloadToken(user);

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  attachCookie({ res, token: refreshToken });

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
  });

  logger.info('User login successfully', {
    id: user.id,
    email: user.email,
    role: user.role,
  });
});
