import { User } from './../../schemas/user.schema';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  // Delete,
} from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findByFilter(@Query() filter) {
    return this.userService.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id, 'student');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(updateUserDto, id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
