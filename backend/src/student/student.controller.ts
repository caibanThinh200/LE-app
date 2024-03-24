import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CurrentUser } from 'src/users/users.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard)
  @Get('/suggest-friend')
  suggestFriend(@CurrentUser() user) {
    return this.studentService.getListFriendSuggestion(user);
  }

  @UseGuards(AuthGuard)
  @Post('/friend-request')
  friendRequest(@CurrentUser() user, @Body() friendInfo: { id: string }) {
    return this.studentService.sendFriendRequest(user, friendInfo.id);
  }
}
