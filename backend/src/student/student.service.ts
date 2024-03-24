import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'schemas/student.schema';
import { User } from 'schemas/user.schema';
import { UserService } from 'src/users/users.service';

@Injectable()
export class StudentService {
  constructor(
    @Inject(UserService) private usersService: UserService,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}
  async getListFriendSuggestion(user: Student) {
    const currentUser = await this.studentModel.findById(user.id);

    if (!currentUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No students found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const suggestFriend = await this.studentModel.find({
      _id: {
        $ne: currentUser.id,
      },
      class: currentUser?.class,
      friends: {
        $ne: [currentUser.id],
      },
    });
    return suggestFriend;
  }

  async sendFriendRequest(user: User, id: string) {
    const requestStudent = await this.studentModel.findById(id);
    if (!requestStudent) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No students found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.studentModel
      .updateOne(
        { _id: requestStudent.id },
        {
          $push: {
            pending: user.id,
          },
        },
      )
      .then(async () => {
        return await this.studentModel.updateOne(
          {
            _id: user.id,
          },
          {
            $push: {
              request: requestStudent.id,
            },
          },
        );
      });
    return result;
  }
}
