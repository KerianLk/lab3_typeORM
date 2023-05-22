import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { In, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto, LogInDto } from './dto/client.dto';
import { IncompleteClientDto } from './dto/incomplete-client.dto';
import { Config } from 'src/config';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { };

  async create(clientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create();
    client.fullname = clientDto.fullname;
    client.email = clientDto.email;
    client.password = clientDto.password;
    client.phone = clientDto.phone;
    client.role = clientDto.role;

    const orders = await this.orderRepository.findBy({
      id: In(clientDto.orders),
    });
    await this.clientRepository.save(client);
    return client;
  }

  async logIn(logInDto: LogInDto): Promise<void> {
    return await this.clientRepository
      .findOneBy({
        email: logInDto.email,
      })
      .then((client) => {
        if (!client || logInDto.password !== client.password) {
          throw new UnauthorizedException();
        }
        const payload = {
          email: client.email,
        };
        return jwt.sign(payload, Config.SECRET_KEY, {});
      });
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find({
      relations: {
        orders: true
      }
    });
    return clients;
  }

  async findOne(id: number): Promise<Client> {
    const findClient = await this.clientRepository.findOne({
      where: { id },
      relations: {
        orders: true
      }
    });
    return findClient;
  }

  async findIncomplete(): Promise<IncompleteClientDto[]> {
    const clients = await this.clientRepository.find();
    const incompleteClients: IncompleteClientDto[] = clients.map((client) => {
      const incompleteClient = new IncompleteClientDto();
      incompleteClient.fullName = client.fullname;
      return incompleteClient;
    });
    return incompleteClients;
  }

  async update(id: number, updatedClient: Client) {
    const client = await this.clientRepository.findOne({ 
      where: { id }, 
      relations: {
        orders: true
      } });

    client.fullname = updatedClient.fullname;
    client.email = updatedClient.email;
    client.phone = updatedClient.phone;

    await this.clientRepository.save(client);
    return client;
  }

  remove(id: number) {
    this.clientRepository.delete({ id });
  }
}
