import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from 'src/controller/campaign.controller';
import { Campaign } from 'src/entity/campaign.entity';
import { List } from 'src/entity/list.entity';
import { Organization } from 'src/entity/organization.entity';
import { CampaignService } from 'src/service/campaign.service';

@Module({
    imports: [TypeOrmModule.forFeature([Campaign, List, Organization])],
    controllers: [CampaignController],
    providers: [CampaignService],
})
export class CampaignModule {}
