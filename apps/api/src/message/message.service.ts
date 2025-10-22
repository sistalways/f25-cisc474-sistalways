import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Ensure prisma.service.ts exists in the same directory
import { Prisma } from '@prisma/client';
import { MessageCreateIn,MessageUpdateIn } from '@repo/api/inbox/dto/inbox.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }
  async create(createMessageDTO: MessageCreateIn){
    const message = await this.prisma.course.create({ data: createMessageDTO });
    return {
      contetnt:message.content,
      sentAt:message.sentAt,
      status:message.status,
      senderId:message.senderId,
      receiverId:message.receiverId,
      id:message.id
    };
  }

  async update(id: number,updateMessageDto:MessageUpdateIn) {
    const message = await this.prisma.course.update({ where: { id }, data :updateMessageDto });
    if (!message) {
      throw new Error('Course ${id} not found');
    }
  }

  async delete(id: number){
    const message = await this.prisma.course.findUnique({ where: { id } });
    if (!message) {
      throw new Error('Course ${id} not found');
    }
  }
}
