import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { Client } from '../entities/client.entity';
import { Config } from 'src/config';
import { ROLES_KEY } from './decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector = new Reflector(),
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const token: string = request.cookies['token'];
    if (!token) {
      throw new UnauthorizedException();
    }
    const email: string = jwt.decode(token, Config.SECRET_KEY, {}).email;
    const client = await this.clientRepository.findOneBy({
      email: email,
    });
    if (!client) {
      throw new UnauthorizedException();
    }
    if (roles.includes(client.role)) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
