import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { CreateClientDto, LogInDto } from './dto/client.dto';
import { RolesGuard } from './roles/guard';
import { Roles } from 'src/сlients/roles/decorator';
import { Role } from './entities/role.enum';
import { Config } from 'src/config';

@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @ApiOperation({ summary: 'Ограниченная информация о клиентах' })
  @Get('incomplete')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  findIncomplete() {
    return this.clientsService.findIncomplete();
  }

  @ApiOperation({ summary: 'Все клиенты' })
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск по айди клиента' })
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновление информации клиента (по идентификатору)',
  })
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updatedClient: Client) {
    return this.clientsService.update(+id, updatedClient);
  }

  @ApiOperation({ summary: 'Создание клиента' })
  @Post()
  create(@Body() createClient: CreateClientDto) {
    return this.clientsService.create(createClient);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @Post('log_in')
  async logIn(
    @Body() logInDto: LogInDto,
    @Res({passthrough: true}) response: Response,
  ) {
    const token = await this.clientsService.logIn(logInDto);
    response.cookie('token', token, {
      expires: new Date(
        Date.now() + Config.COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 7,
      ),
    });
    return token;
  }

  @ApiOperation({ summary: 'Удаление клиента' })
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

