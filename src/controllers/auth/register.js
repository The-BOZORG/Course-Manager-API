import { logger } from '../../utils/logger.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';
import { ConflictError } from '../../errors/conflict.js';
import {
  attachCookie,
  payloadToken,
  createAccessToken,
  createRefreshToken,
} from '../../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existUser = await User.findOne({
    where: { email },
    attributes: ['id', 'email'],
    raw: true,
  });

  if (existUser) throw new ConflictError('email already exist', 409);

  const adminAccount = (await User.count()) === 0;
  const role = adminAccount ? 'admin' : 'user';

  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });

  const payload = payloadToken(newUser);

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  attachCookie({ res, token: refreshToken });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
    accessToken,
  });

  logger.info('User registered successfully', {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
});
