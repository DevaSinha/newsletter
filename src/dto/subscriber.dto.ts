import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Subscriber } from 'src/entity/subscriber.entity';

export class CreateSubscriberDto {
    @IsEmail()
    @ApiProperty({ example: 'subscriber@example.com'})
    email: string;

    @IsString()
    @ApiProperty({ example: 'string'})
    organizationId: string;

    @IsOptional()
    @ApiProperty({ example: '{}'})
    custom_fields?: Record<string, any>;
}

export class PaginatedSubscribersResponse {
    data: Subscriber[];
    total: number;
    page: number;
    limit: number;
}

export class SubscriberFilterDto {
    @ApiProperty({ example: 'subscriber@example.com'})
    email?: string;
    @ApiProperty({ example: 'string'})
    organizationId?: string;
    @ApiProperty({ example: new Date()})
    createdAt?: Date;
}

export class UpdateSubscriberDto {
    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: 'subscriber@example.com'})
    email?: string;

    @IsOptional()
    @ApiProperty({ example: '{}'})
    custom_fields?: Record<string, any>;
}


