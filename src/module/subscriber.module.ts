import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from '../entity/subscriber.entity';
import { Organization } from '../entity/organization.entity';
import { SubscriberService } from '../service/subscriber.service';
import { SubscriberController } from '../controller/subscriber.controller';
import { OrganizationService } from 'src/service/organization.service';

@Module({
    imports: [TypeOrmModule.forFeature([Subscriber, Organization])],
    controllers: [SubscriberController],
    providers: [SubscriberService, OrganizationService],
})
export class SubscriberModule {}
