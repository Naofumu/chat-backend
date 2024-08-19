import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    return await this.messageService.create(createMessageDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return this.messageService.findAll(req.user.username);
  }
}
