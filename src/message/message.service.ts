import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/types/types';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto, user: User) {
    const message = this.messageRepository.create({
      ...createMessageDto,
      user: user
    });
    return await this.messageRepository.save(message)
  }

  async findAll(username: string) {
    return await this.messageRepository.find({
      where: { user: { username } },
      order: { createdAt: 'ASC'},
      relations: ['user']
    })
  }
}
