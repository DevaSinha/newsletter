import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCampaignDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'string'})
    subject: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'string'})
    content: string;

    @IsUUID()
    @ApiProperty({ example: 'string'})
    listId: string;

    @IsUUID()
    @ApiProperty({ example: 'string'})
    organizationId: string;
}

export class CampaignFilterDto {
    @IsUUID()
    organizationId: string;
}

