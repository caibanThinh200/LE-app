import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserController } from 'src/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'schemas/student.schema';
import { User, UserSchema } from 'schemas/user.schema';

JwtModule.register({
  secret: process.env.JWT_SECRET_TOKEN,
});

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule {}
