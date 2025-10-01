import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ensure prisma.service.ts exists in the same directory
import { Prisma } from '@prisma/client';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany();
  }

  findOne(id: number) {
    return this.prisma.submission.findUnique({
      where: { id },
    });
  }
}