import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService,PrismaService]
})
export class EnrollmentModule {}
