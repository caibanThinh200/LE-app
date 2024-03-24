import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'schemas/student.schema';
import { User, UserSchema } from 'schemas/user.schema';
import { UserController } from 'src/users/users.controller';
import { UserService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StudentController, UserController],
  providers: [StudentService, UserService, JwtService],
})
export class StudentModule {}
