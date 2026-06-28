import { logger } from '../../utils/logger.js';

export const logout = async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  logger.info('Logout success!');

  res.status(200).json({ msg: 'user logout!' });
};
