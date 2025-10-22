import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import {CourseRef, CourseUpdateIn, CourseCreateIn} from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/courses/dto/courses.dto'; 
@Controller('course')
export class CourseController {
constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }
    
  
  @Post()
  createCourse(@Body() createCourseDTO: CourseCreateIn) {
    return this.courseService.create(createCourseDTO);
  }

  @Patch(":id")
  updateCourse(@Param("id") id: number, @Body() updateCourseDto: CourseUpdateIn) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(":id")
  deleteCourse(@Param("id") id: number) {
    return this.courseService.delete(id);
  }
}
