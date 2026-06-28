import jwt from 'jsonwebtoken';

export const payloadToken = (user) => {
  return { userId: user.id, role: user.role };
};

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS, {
    expiresIn: process.env.JWT_ACCESS_TTL,
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: process.env.JWT_REFRESH_TTL,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH);
};

export const attachCookie = ({ res, token }) => {
  const sevenDay = 1000 * 60 * 60 * 24 * 7;

  res.cookie('refreshToken', token, {
    httpOnly: true,
    expires: new Date(Date.now() + sevenDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
