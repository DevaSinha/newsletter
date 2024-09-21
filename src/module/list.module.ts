import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from 'src/controller/list.controller';
import { List } from 'src/entity/list.entity';
import { Organization } from 'src/entity/organization.entity';
import { ListService } from 'src/service/list.service';
import { OrganizationService } from 'src/service/organization.service';

@Module({
    imports: [TypeOrmModule.forFeature([List, Organization])],
    controllers: [ListController],
    providers: [ListService, OrganizationService],
})
export class ListModule {}
