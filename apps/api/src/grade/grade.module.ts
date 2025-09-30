import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [GradeController],
  providers: [GradeService,PrismaService]
})
export class GradeModule {}
