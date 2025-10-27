import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import {CourseRef, CourseUpdateIn, CourseCreateIn} from '@repo/api/courses/dto/courses.dto'; 
import { CurrentUser } from 'src/auth/current-user.decorator';
import {AuthGuard} from '@nestjs/passport';

@Controller('course')
@UseGuards(AuthGuard('jwt'))
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

  @Put(":id")
  updateCourse(@Param("id") id: number, @Body() updateCourseDto: CourseUpdateIn) {
    return this.courseService.update(+id, updateCourseDto);
  }


  @Delete(":id")
  deleteCourse(@Param("id") id: number) {
    return this.courseService.delete(+id);
  }
}
