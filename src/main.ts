import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    require('dotenv').config();
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Newsletter API')
        .setDescription('API documentation for the Newsletter application')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(8000);
}
bootstrap();
