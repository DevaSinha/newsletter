import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from 'src/controller/organization.controller';
import { Organization } from 'src/entity/organization.entity';
import { OrganizationService } from 'src/service/organization.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organization])],
    exports: [OrganizationService],
    controllers: [OrganizationController],
    providers: [OrganizationService],
})
export class OrganizationModule {}
