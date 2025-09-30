
import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
constructor(private readonly usersService: SubmissionService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
    
}
