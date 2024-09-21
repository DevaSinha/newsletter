import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, Length } from 'class-validator';

export class UploadGpgKeyDto {
    @IsUUID()
    @ApiProperty({ example: 'string'})
    subscriberId: string;

    @IsString()
    @Length(32, 4096)
    @ApiProperty({ example: 'string'})
    gpgPublicKey: string;
}
