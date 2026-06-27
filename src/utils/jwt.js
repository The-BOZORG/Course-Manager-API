import jwt from 'jsonwebtoken';

export const payloadToken = (user) => {
  return { userId: user.id, role: user.role };
};

export const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS, {
    expiresIn: process.env.JWT_ACCESS_TTL,
  });
  return token;
};

export const validToken = ({ token }) => {
  return jwt.verify(token, process.env.JWT_ACCESS);
};

export const attachCookie = ({ res, token }) => {
  const sevenDay = 1000 * 60 * 60 * 24 * 7;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + sevenDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
