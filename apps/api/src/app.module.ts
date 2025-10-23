import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AssignmentModule } from './assignment/assignment.module';
import { SubmissionModule } from './submission/submission.module';
import { GradeModule } from './grade/grade.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [LinksModule, UserModule, CourseModule, EnrollmentModule, AssignmentModule, SubmissionModule, GradeModule, MessageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
