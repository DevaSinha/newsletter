import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { organizationRequest } from 'src/dto/organization.dto';
import { Organization } from 'src/entity/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async addOrganization(organization: organizationRequest) {
        const org = this.organizationRepository.create({
            name: organization.name,
        });
        return this.organizationRepository.save(org);
    }

    async getAllOrganizations(): Promise<Organization[]> {
        return this.organizationRepository.find();
    }

    async getOrganizationById(id: string): Promise<Organization> {
        return this.organizationRepository.findOne({where: {id: id}});
    }
}
