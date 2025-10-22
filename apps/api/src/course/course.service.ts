import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ensure prisma.service.ts exists in the same directory
import {CourseRef, CourseUpdateIn, CourseCreateIn} from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/courses/dto/courses.dto'; 




@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }
  async create(createCourseDTO: CourseCreateIn){
    const course = await this.prisma.course.create({ data: createCourseDTO });
    return {
      title:course.title,
      description:course.description,
      instructorId:course.instructorId,
      createdAt :course.createdAt,
      updatedAt :course.updatedAt,
      id:course.id
    };
  }

  async update(id: number,updateCourseDto:CourseUpdateIn) {
    const course = await this.prisma.course.update({ where: { id }, data :updateCourseDto });
    if (!course) {
      throw new Error('Course ${id} not found');
    }
  }

  async delete(id: number){
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new Error('Course ${id} not found');
    }
  }
}