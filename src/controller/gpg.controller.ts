import { Controller, Post, Body } from '@nestjs/common';
import { SubscriberService } from 'src/service/subscriber.service';
import { Subscriber } from 'src/entity/subscriber.entity';
import { UploadGpgKeyDto } from 'src/dto/gpgKey.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/gpg')
@ApiTags('Subscriber controller')
export class GpgController {
    constructor(private readonly subscriberService: SubscriberService) {}

    @Post('upload')
    @ApiOperation({ summary: 'Add GPG key for subscriber' })
    @ApiResponse({ status: 201, description: 'key added successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async uploadGpgPublicKey(@Body() uploadGpgKeyDto: UploadGpgKeyDto): Promise<Subscriber> {
        return this.subscriberService.uploadGpgPublicKey(uploadGpgKeyDto);
    }
}
