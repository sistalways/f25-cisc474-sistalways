import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ensure prisma.service.ts exists in the same directory
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignment.findMany();
  }

  findOne(id: number) {
    return this.prisma.assignment.findUnique({
      where: { id },
    });
  }
}