import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
constructor(private readonly CourseService: CourseService) {}

  @Get()
  findAll() {
    return this.CourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CourseService.findOne(+id);
  }
    
}
