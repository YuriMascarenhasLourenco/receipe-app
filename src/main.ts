import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Recipe Book AI API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter the JWT token below',
      },
      'access-token',
    )
    .setDescription(
      `
      The smart recipe book API documentation. Generate recipes from American and Brazilian cuisine and storage like your own recipe book.
      
      This documentation includes the following features:

      **✔ JWT Authentication**  
      ✔ User registration and profile management  
      ✔ Recipe creation, updating, deletion, and retrieval
      ✔ Ai-powered recipe generation from prompts (Azure AI Foundry)
      ✔ Clean Architecture (Domain → Application → Infra → Presentation)**`,
    )
    .setVersion('1.0')
    .addTag('Auth', 'Autentication and user manegement')
    .addTag('Recipes', 'Generation and recipe smart search')
    .addTag('User', 'Profile and user management')
    .addTag('AI', 'Azure AI Foundry integration')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    customSiteTitle: 'Recipe Book AI — API Docs',
  });

  await app.listen(process.env.PORT);
}
bootstrap();
