import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'list name'})
    name: string;

    @IsOptional()
    @ApiProperty({ example: '{}'})
    custom_fields?: Record<string, any>;

    @IsNotEmpty()
    @ApiProperty({ example: 'string'})
    organizationId: string;
}

export class UpdateListDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'list name'})
    name?: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ example: '{}'})
    custom_fields?: Record<string, any>;
}
