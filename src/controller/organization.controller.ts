import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/config/jwt/role.guard';
import { Roles } from 'src/config/roles.config';
import { organizationRequest } from 'src/dto/organization.dto';
import { UserRole } from 'src/utils/roles';
import { OrganizationService } from 'src/service/organization.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/organizations')
@ApiTags('Organization Controller')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post()
    @ApiOperation({ summary: 'Add a new organization' })
    @ApiResponse({ status: 201, description: 'Organization added successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @HttpCode(HttpStatus.CREATED)
    async addOrganization(@Body() organizationRequest: organizationRequest) {
        return this.organizationService.addOrganization(organizationRequest);
    }

    @Get()
    @ApiOperation({ summary: 'Get all organizations' })
    @ApiResponse({ status: 200, description: 'Organizations fetched successfully' })
    @ApiResponse({ status: 403, description: 'You do not have permission to access this resource' })
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async listAllOrganizations() {
        return this.organizationService.getAllOrganizations();
    }
}
