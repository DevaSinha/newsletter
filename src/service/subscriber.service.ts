import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Subscriber } from 'src/entity/subscriber.entity';
import {
    CreateSubscriberDto,
    PaginatedSubscribersResponse,
    SubscriberFilterDto,
    UpdateSubscriberDto,
} from 'src/dto/subscriber.dto';
import { OrganizationService } from './organization.service';
import { validateUUID } from 'src/utility/checkValidity.utility';
import { ValidationException } from 'src/exceptions/validation.exception';
import { UploadGpgKeyDto } from 'src/dto/gpgKey.dto';

@Injectable()
export class SubscriberService {
    constructor(
        @InjectRepository(Subscriber)
        private readonly subscriberRepository: Repository<Subscriber>,
        private readonly organizationService: OrganizationService,
    ) {}

    async addSubscriber(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
        const { email, organizationId, custom_fields } = createSubscriberDto;

        const organization = await this.organizationService.getOrganizationById(organizationId);

        if (!organization) {
            throw new Error('Organization not found');
        }

        const subscriber = this.subscriberRepository.create({
            email,
            organization,
            custom_fields,
            created_at: new Date(),
        });

        return this.subscriberRepository.save(subscriber);
    }

    async getSubscribers({
        page,
        limit,
        email,
        organizationId,
        createdAt,
    }: SubscriberFilterDto & {
        page: number;
        limit: number;
    }): Promise<PaginatedSubscribersResponse> {
        const queryBuilder = this.subscriberRepository.createQueryBuilder('subscriber');

        this.applyFilters(queryBuilder, { email, organizationId, createdAt });

        const [data, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
        };
    }

    private applyFilters(
        queryBuilder: SelectQueryBuilder<Subscriber>,
        filters: SubscriberFilterDto,
    ) {
        const { email, organizationId, createdAt } = filters;

        const conditions: string[] = [];
        const parameters: Record<string, any> = {};

        if (email) {
            conditions.push('subscriber.email ILIKE :email');
            parameters.email = `%${email}%`;
        }

        if (organizationId) {
            conditions.push('subscriber.organizationId = :organizationId');
            parameters.organizationId = organizationId;
        }

        if (createdAt) {
            conditions.push('subscriber.created_at >= :createdAt');
            parameters.createdAt = createdAt;
        }

        if (conditions.length > 0) {
            queryBuilder.andWhere(conditions.join(' AND '), parameters);
        }
    }

    async updateSubscriber(
        id: string,
        updateSubscriberDto: UpdateSubscriberDto,
    ): Promise<Subscriber> {
        if (!validateUUID(id)) throw new ValidationException('Invalid id');
        const subscriber = await this.subscriberRepository.findOne({ where: { id: id } });
        if (!subscriber) {
            throw new NotFoundException('Subscriber not found');
        }

        Object.assign(subscriber, updateSubscriberDto);
        return this.subscriberRepository.save(subscriber);
    }

    async uploadGpgPublicKey(uploadGpgKeyDto: UploadGpgKeyDto): Promise<Subscriber> {
        const { subscriberId, gpgPublicKey } = uploadGpgKeyDto;

        const subscriber = await this.subscriberRepository.findOne({ where: { id: subscriberId } });
        if (!subscriber) {
            throw new NotFoundException('Subscriber not found');
        }

        subscriber.gpg_public_key = gpgPublicKey;

        return this.subscriberRepository.save(subscriber);
    }
}
