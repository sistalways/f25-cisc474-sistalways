import { Controller, Get, Param } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
constructor(private readonly usersService: GradeService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
    
}
