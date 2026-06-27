import { logger } from '../../utils/logger.js';

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });

  logger.info('Logout success!');

  res.status(200).json({ msg: 'user logout!' });
};
