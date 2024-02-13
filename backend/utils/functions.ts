import { Model } from 'mongoose';
import { Student } from 'schemas/student.schema';
import { User } from 'schemas/user.schema';

export const getRepoByType = (type: 'student', studentRepo: Model<Student>) => {
  const userType = {
    student: studentRepo,
  };
  return userType[type];
};
