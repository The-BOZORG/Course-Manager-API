export async function up({ context: queryInterface }) {
  const coursesTable = await queryInterface.describeTable('courses');

  if (coursesTable.instructorId && !coursesTable.instructor_id) {
    await queryInterface.renameColumn('courses', 'instructorId', 'instructor_id');
  }

  await queryInterface.addConstraint('courses', {
    fields: ['instructor_id'],
    type: 'foreign key',
    name: 'courses_instructor_id_fk',
    references: {
      table: 'instructors',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await queryInterface.addConstraint('comments', {
    fields: ['course_id'],
    type: 'foreign key',
    name: 'comments_course_id_fk',
    references: {
      table: 'courses',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await queryInterface.addConstraint('comments', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'comments_user_id_fk',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeConstraint('comments', 'comments_user_id_fk');
  await queryInterface.removeConstraint('comments', 'comments_course_id_fk');
  await queryInterface.removeConstraint('courses', 'courses_instructor_id_fk');
}
