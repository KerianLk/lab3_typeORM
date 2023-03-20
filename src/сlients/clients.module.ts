import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Client } from 'src/сlients/client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Client]), 
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}

