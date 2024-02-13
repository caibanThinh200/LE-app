import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PronouceScoreService } from './pronouce-score.service';
@Controller('pronouce-score')
export class PronouceScoreController {
  constructor(private readonly pronouceScoreService: PronouceScoreService) {}

  @Post()
  create(@Body() createPronouceScoreDto: any) {
    return this.pronouceScoreService.create(createPronouceScoreDto);
  }

  @Get()
  findAll() {
    return this.pronouceScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pronouceScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePronouceScoreDto: any) {
    return this.pronouceScoreService.update(updatePronouceScoreDto, id);
  }
}
