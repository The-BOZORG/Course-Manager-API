import { User } from './user.js';
import { Instructor } from './instructor.js';
import { Course } from './course.js';
import { Comment } from './comment.js';

// Instructor <-> Course (One-to-Many)
Instructor.hasMany(Course, {
  foreignKey: {
    name: 'instructorId',
    field: 'instructor_id',
    allowNull: false,
  },
  as: 'courses',
  onDelete: 'CASCADE',
});
Course.belongsTo(Instructor, {
  foreignKey: {
    name: 'instructorId',
    field: 'instructor_id',
    allowNull: false,
  },
  as: 'instructor',
});

// User <-> Comment (One-to-Many)
User.hasMany(Comment, {
  foreignKey: {
    name: 'userId',
    field: 'user_id',
    allowNull: false,
  },
  as: 'comments',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    field: 'user_id',
    allowNull: false,
  },
  as: 'user',
});

// Course <-> Comment (One-to-Many)
Course.hasMany(Comment, {
  foreignKey: {
    name: 'courseId',
    field: 'course_id',
    allowNull: false,
  },
  as: 'comments',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Course, {
  foreignKey: {
    name: 'courseId',
    field: 'course_id',
    allowNull: false,
  },
  as: 'course',
});

export { User, Instructor, Course, Comment };
