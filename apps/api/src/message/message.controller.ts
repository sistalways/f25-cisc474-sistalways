import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
constructor(private readonly MessageService: MessageService) {}

  @Get()
  findAll() {
    return this.MessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MessageService.findOne(+id);
  }
    
}
