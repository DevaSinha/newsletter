import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/entity/subscriber.entity';
import { OrganizationService } from 'src/service/organization.service';
import { Organization } from 'src/entity/organization.entity';
import { GpgController } from 'src/controller/gpg.controller';
import { SubscriberService } from 'src/service/subscriber.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Subscriber, Organization]),
    ],
    controllers: [GpgController],
    providers: [SubscriberService, OrganizationService],
})
export class GpgModule {}
