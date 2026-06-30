import { User } from './user.js';
import { Comment } from './comment.js';

// User <-> Comment (One-to-Many)
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, Comment };
