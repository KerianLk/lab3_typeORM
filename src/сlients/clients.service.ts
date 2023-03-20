import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatasourceService } from 'src/datasource/datasource.service';
import { create } from 'ts-node';
import { In, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/client.dto';
import { IncompleteClientDto } from './dto/incomplete-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>) {}
    
    async create(clientDto: CreateClientDto): Promise<Client>{
        //получаем объект CreateAuthorDto
        const client = this.clientRepository.create(); //создаем объект Author из репозитория
        client.fullname = clientDto.fullname; //заполняем поля объекта Author
        client.email = clientDto.email;
        client.phone = clientDto.phone;
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
          const incompleteAuthor = new IncompleteClientDto();
          incompleteAuthor.id = client.id;
          incompleteAuthor.fullName = client.fullname;
          return incompleteAuthor;
        });
        return incompleteClients; 
    }

    update(id: number, updatedClient: Client) {
        const index = this.datasourceService.getClients()
        .findIndex((client) => client.id === id);
        this.datasourceService.getClients()[index] = updatedClient;

        return this.datasourceService.getClients()[index];
    }

    remove(id: number) {
        const index = this.datasourceService.getClients()
        .findIndex((client) => client.id === id);
        this.datasourceService.getClients().splice(index, 1);

        return HttpStatus.OK;
    }

}