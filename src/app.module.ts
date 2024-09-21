import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './config/jwt/jwt-auth.guard';
import { OrganizationModule } from './module/organization.module';
import { SubscriberModule } from './module/subscriber.module';
import { ListModule } from './module/list.module';
import { CampaignModule } from './module/campaign.module';
import { GpgModule } from './module/gpg.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        JwtModule,
        UserModule,
        AuthModule,
        OrganizationModule,
        SubscriberModule,
        ListModule,
        CampaignModule,
        GpgModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
