import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto, UpdateListDto } from 'src/dto/list.dto';
import { List } from 'src/entity/list.entity';
import { Repository } from 'typeorm';
import { OrganizationService } from './organization.service';
import { InjectRepository } from '@nestjs/typeorm';
import { validateUUID } from 'src/utility/checkValidity.utility';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
        private readonly organizationService: OrganizationService,
    ) {}

    async createList(createListDto: CreateListDto): Promise<List> {
        const { organizationId, ...listData } = createListDto;

        const organization = await this.organizationService.getOrganizationById(organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }

        const list = this.listRepository.create({
            ...listData,
            organization,
        });

        return this.listRepository.save(list);
    }

    async getListsForOrganization(organizationId: string): Promise<List[]> {
        return this.listRepository.find({
            where: { organization: { id: organizationId } },
        });
    }

    async updateList(id: string, updateListDto: UpdateListDto): Promise<List> {
        if(!validateUUID(id)) throw new ValidationException("Invalid id");
        const list = await this.listRepository.findOne({ where: { id } });
        if (!list) {
            throw new NotFoundException(`List with ID ${id} not found`);
        }

        Object.assign(list, updateListDto);
        return this.listRepository.save(list);
    }
}
