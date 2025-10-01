import { Controller, Get, Param } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
constructor(private readonly GradeService: GradeService) {}

  @Get()
  findAll() {
    return this.GradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.GradeService.findOne(+id);
  }
    
}
