import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import {MessageRef, MessageUpdateIn, MessageCreateIn} from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/inbox/dto/inbox.dto'; 
@Controller('message')
export class MessageController {
constructor(private readonly messageService: MessageService) {}

@Get()
findAll() {
  return this.messageService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.messageService.findOne(+id);
}
  

@Post()
createCourse(@Body() messageCourseDTO: MessageCreateIn) {
  return this.messageService.create(messageCourseDTO);
}

@Patch(":id")
updateCourse(@Param("id") id: number, @Body() updateMessageDto: MessageUpdateIn) {
  return this.messageService.update(id, updateMessageDto);
}

@Delete(":id")
deleteCourse(@Param("id") id: number) {
  return this.messageService.delete(id);
}
    
}
