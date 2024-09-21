import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubscriberDto, PaginatedSubscribersResponse, SubscriberFilterDto, UpdateSubscriberDto } from 'src/dto/subscriber.dto';
import { SubscriberService } from 'src/service/subscriber.service';

@Controller('api/subscribers')
@ApiTags('Subscriber controller')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService) {}

    @Post()
    @ApiOperation({ summary: 'Add new subscriber' })
    @ApiResponse({ status: 201, description: 'Subscriber added successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @HttpCode(HttpStatus.CREATED)
    async addSubscriber(@Body() createSubscriberDto: CreateSubscriberDto) {
        return this.subscriberService.addSubscriber(createSubscriberDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get list of subscribers' })
    @ApiResponse({ status: 200, description: 'Subscribers fetched successfully' })
    @ApiResponse({ status: 404, description: 'Subscribers not found' })
    async getSubscribers(
        @Query() filter: SubscriberFilterDto,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<PaginatedSubscribersResponse> {
        return this.subscriberService.getSubscribers({ ...filter, page, limit });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update subscriber' })
    @ApiResponse({ status: 200, description: 'Subscriber updated successfully' })
    @ApiResponse({ status: 404, description: 'Subscriber not found' })
    @HttpCode(HttpStatus.OK)
    async updateSubscriber(
        @Param('id') id: string,
        @Body() updateSubscriberDto: UpdateSubscriberDto,
    ) {
        return this.subscriberService.updateSubscriber(id, updateSubscriberDto);
    }
}
