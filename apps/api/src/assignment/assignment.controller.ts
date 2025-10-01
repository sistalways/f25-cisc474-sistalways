import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignment')
export class AssignmentController {
constructor(private readonly AssignmentService: AssignmentService) {}

  @Get()
  findAll() {
    return this.AssignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AssignmentService.findOne(+id);
  }
    
}
