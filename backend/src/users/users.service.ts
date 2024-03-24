import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'schemas/student.schema';
import { User } from 'schemas/user.schema';
import { omit } from 'lodash';
import { getRepoByType } from 'utils/functions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(Student.name) private student: Model<Student>,
  ) {}
  async create(createUserDto: User | Student): Promise<User> {
    const data = {
      info: {
        name: (createUserDto as User).name,
        username: (createUserDto as User).username,
        phoneNumber: (createUserDto as User).phoneNumber,
        status: (createUserDto as User).status,
        password: (createUserDto as User).password,
        type: (createUserDto as User).type,
      },
      ...omit(createUserDto, [
        'name',
        'username',
        'phoneNumber',
        'status',
        'password',
        'type',
      ]),
    };
    const userTypes = {
      student: new this.student(data) as Student,
    };

    const duplicate = await (
      this[(createUserDto as User).type] as Model<Student>
    ).findOne({
      $or: [
        {
          'info.username': (createUserDto as User).username,
          classCode: (createUserDto as Student).classCode,
        },
      ],
    });

    // if (duplicate) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.CONFLICT,
    //       error: 'User existed',
    //     },
    //     HttpStatus.CONFLICT,
    //   );
    // }

    const createdUser = userTypes[(createUserDto as User)?.type];
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.user.find().exec();
  }

  async findByFilter(filter: object) {
    const users = await this.user.find({ ...filter });
    return users;
  }

  async findOne(id, type) {
    const user = await (
      getRepoByType(type, this.student) || this.student
    ).findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No user found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async checkExist(user: User) {
    const { phoneNumber, username, type } = user;
    const duplicate = await (this[type] as Model<Student>).findOne({
      $or: [
        {
          'info.username': username,
          'info.phoneNumber': phoneNumber,
        },
      ],
    });

    if (duplicate) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User existed',
        },
        HttpStatus.CONFLICT,
      );
    }
    return {
      status: 200,
      message: 'Can register this username and phone number',
    };
  }

  async findByUsername(username, type) {
    const user = await (
      getRepoByType(type, this.student) || this.student
    ).findOne({
      'info.username': username,
    });
    // if (!user) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_FOUND,
    //       error: 'No user found',
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    return user;
  }

  async update(updateUser: User, id: string): Promise<User> {
    const user = await this.user.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No User found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user.updateOne(updateUser);
  }

  // @UseGuards(AuthGuard)
  async addFriendStudent(id: string) {}
}
