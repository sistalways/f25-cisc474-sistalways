import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly usersService: EnrollmentService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}