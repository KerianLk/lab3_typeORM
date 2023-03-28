import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatasourceService } from 'src/datasource/datasource.service';
import {Order} from 'src/orders/entities/order.entity';
import { create } from 'ts-node';
import { In, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/client.dto';
import { IncompleteClientDto } from './dto/incomplete-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>) {}
    
    async create(clientDto: CreateClientDto): Promise<Client>{
        
        const client = this.clientRepository.create(); 
        client.fullname = clientDto.fullname; 
        client.email = clientDto.email;
        client.phone = clientDto.phone;

        const orders = await this.orderRepository.findBy({
            id: In(clientDto.orders),
        });
        await this.clientRepository.save(client); 
        return client; 
    }
    async findAll(): Promise<Client[]> {
        const clients = await this.clientRepository.find();
        return clients; 
      }
    
    async findOne(id: number): Promise<Client> {
        const findClient = await this.clientRepository.findOne(
            {where: { id }
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
        const client = await this.clientRepository.findOne({ where: { id }});

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