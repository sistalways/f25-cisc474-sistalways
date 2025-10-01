import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ensure prisma.service.ts exists in the same directory
import { Prisma } from '@prisma/client';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.grade.findMany();
  }

  findOne(id: number) {
    return this.prisma.grade.findUnique({
      where: { id },
    });
  }
}