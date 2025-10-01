
import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
constructor(private readonly SubmissionService: SubmissionService) {}

  @Get()
  findAll() {
    return this.SubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SubmissionService.findOne(+id);
  }
    
}
