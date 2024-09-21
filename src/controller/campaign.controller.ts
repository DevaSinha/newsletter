import { Body, Controller, Post, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { CampaignService } from 'src/service/campaign.service';
import { Campaign } from 'src/entity/campaign.entity';
import { CampaignFilterDto, CreateCampaignDto } from 'src/dto/campaign.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/campaigns')
@ApiTags('Campaign controller')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Post()
    @ApiOperation({ summary: 'Add new campaign' })
    @ApiResponse({ status: 201, description: 'Campaign added successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @HttpCode(HttpStatus.CREATED)
    async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignService.createCampaign(createCampaignDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find campaign by id' })
    @ApiResponse({ status: 200, description: 'Campaign fetched successfully' })
    @ApiResponse({ status: 404, description: 'Campaign not found' })
    async getCampaigns(@Query() campaignFilterDto: CampaignFilterDto): Promise<Campaign[]> {
        return this.campaignService.getCampaignsByOrganization(campaignFilterDto);
    }
}
