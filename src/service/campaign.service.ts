import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/entity/campaign.entity';
import { List } from 'src/entity/list.entity';
import { Organization } from 'src/entity/organization.entity';
import { CampaignFilterDto, CreateCampaignDto } from 'src/dto/campaign.dto';
import { validateUUID } from 'src/utility/checkValidity.utility';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        const { subject, content, listId, organizationId } = createCampaignDto;

        if (!validateUUID(listId)) throw new ValidationException('Invalid list id');
        if (!validateUUID(organizationId)) throw new ValidationException('Invalid organization id');

        const [list, organization] = await Promise.all([
            this.listRepository.findOne({ where: { id: listId } }),
            this.organizationRepository.findOne({ where: { id: organizationId } }),
        ]);

        if (!list) throw new NotFoundException('List not found');
        if (!organization) throw new NotFoundException('Organization not found');

        const campaign = this.campaignRepository.create({
            subject,
            content,
            list,
            organization,
            created_at: new Date(),
        });

        return this.campaignRepository.save(campaign);
    }

    async getCampaignsByOrganization(campaignFilterDto: CampaignFilterDto): Promise<Campaign[]> {
        const { organizationId } = campaignFilterDto;
        if (!validateUUID(organizationId)) throw new ValidationException('Invalid organization id');
        const campaigns = await this.campaignRepository.find({
            where: { organization: { id: organizationId } },
        });

        return campaigns;
    }
}
