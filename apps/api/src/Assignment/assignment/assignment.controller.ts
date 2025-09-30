import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignment')
export class AssignmentController {
constructor(private readonly usersService: AssignmentService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
    
}
