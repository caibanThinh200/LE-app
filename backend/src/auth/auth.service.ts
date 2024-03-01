import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { Student } from 'schemas/student.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUser: User) {
    const user = await this.usersService.findByUsername(
      loginUser?.username,
      loginUser.type,
    );
    if (user && bcrypt.compareSync(loginUser.password, user?.info?.password)) {
      const payload = { sub: user.id, username: user?.info?.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_TOKEN,
        }),
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User or password is invalid',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkUserExist(user: User) {
    const { phoneNumber, username } = user;
    const duplicate = await (
      this[(user as User).type] as Model<Student>
    ).findOne({
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
    return true;
  }

  async register(user: User) {
    const { password } = user;
    const hashPassword = await bcrypt.hash(password, 10);
    const createUserDto = {
      ...user,
      status: 'official',
      password: hashPassword,
    } as User;
    return this.usersService.create(createUserDto);
  }

  async onboard(user: User) {
    const createUserDto = { ...user, status: 'onboard' } as User;
    return this.usersService.create(createUserDto);
  }

  async checkUser(headers: Headers) {
    const token = headers['authorization']?.replace('Bearer ', '');

    const checkToken = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET_TOKEN,
      })
      .catch((e) => {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Invalid token',
          },
          HttpStatus.UNAUTHORIZED,
        );
      });
    const checkUser = this.usersService.findOne(
      checkToken?.sub || '',
      'student',
    );
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return checkUser;
  }
}
