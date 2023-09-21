import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhonebookService } from './phonebook.service';
import { Prisma } from '@prisma/client';
import { basePath } from 'constants/Url';

@Controller(basePath + 'phonebook')
export class PhonebookController {
  constructor(private readonly phonebookService: PhonebookService) {}

  @Post()
  async create(@Body() createPhonebookDto: Prisma.PhonebookCreateInput) {
    return await this.phonebookService.create(createPhonebookDto);
  }

  @Get()
  async findAll() {
    return this.phonebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phonebookService.findOne(id);
  }

  @Get('user/:userId')
  findManyByUserId(@Param('userId') userId: string) {
    return this.phonebookService.findManyByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhonebookDto: Prisma.PhonebookUpdateInput,
  ) {
    return this.phonebookService.update(id, updatePhonebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phonebookService.remove(id);
  }
}
