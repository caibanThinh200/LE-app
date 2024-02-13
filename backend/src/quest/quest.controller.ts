import { Quest } from './../../schemas/quest.schema';
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
import { QuestService } from './quest.service';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Post()
  create(@Body() createQuestDto: Quest) {
    return this.questService.create(createQuestDto);
  }

  @Get()
  findByFilter(@Query() filter) {
    return this.questService.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestDto: Quest) {
    return this.questService.update(updateQuestDto, id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questService.remove(+id);
  // }
}
