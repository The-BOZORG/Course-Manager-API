import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { User } from '../../models/user.js';

export const getInstructorRequests = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    where: {
      instructorRequest: 'pending',
    },
    attributes: ['id', 'username', 'email', 'instructorRequest'],
  });

  return res.status(200).json({
    success: true,
    data: users,
  });
});
