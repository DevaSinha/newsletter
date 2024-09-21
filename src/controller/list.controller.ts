import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateListDto, UpdateListDto } from 'src/dto/list.dto';
import { List } from 'src/entity/list.entity';
import { ListService } from 'src/service/list.service';

@Controller('api/lists')
@ApiTags('List controller')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Post()
    @ApiOperation({ summary: 'Add a new list' })
    @ApiResponse({ status: 201, description: 'List added successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @HttpCode(HttpStatus.CREATED)
    async createList(@Body() createListDto: CreateListDto) {
        return this.listService.createList(createListDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find list by organization id' })
    @ApiResponse({ status: 200, description: 'list fetched successfully' })
    @ApiResponse({ status: 404, description: 'List not found' })
    async getListsForOrganization(
        @Query('organizationId') organizationId: string,
    ): Promise<List[]> {
        if (!organizationId) {
            throw new NotFoundException('Organization ID is required');
        }
        return this.listService.getListsForOrganization(organizationId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update list' })
    @ApiResponse({ status: 200, description: 'List updated successfully' })
    @ApiResponse({ status: 404, description: 'List not found' })
    async updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto): Promise<List> {
        const list = await this.listService.updateList(id, updateListDto);
        if (!list) {
            throw new NotFoundException('List not found');
        }
        return list;
    }
}
