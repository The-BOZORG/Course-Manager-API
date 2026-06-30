import { User } from './user.js';
import { Instructor } from './instructor.js';
import { Course } from './course.js';
import { Comment } from './comment.js';

// Instructor <-> Course (One-to-Many)
Instructor.hasMany(Course, {
  foreignKey: 'instructorId',
  as: 'courses',
  onDelete: 'CASCADE',
});
Course.belongsTo(Instructor, {
  foreignKey: 'instructorId',
  as: 'instructor',
});

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

// Course <-> Comment (One-to-Many)
Course.hasMany(Comment, {
  foreignKey: 'courseId',
  as: 'comments',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'course',
});

export { User, Instructor, Course, Comment };
