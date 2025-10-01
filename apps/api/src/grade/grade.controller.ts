import { Controller, Get, Param } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
constructor(private readonly gradeService: GradeService) {}

  @Get()
  findAll() {
    return this.gradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(+id);
  }
    
}
