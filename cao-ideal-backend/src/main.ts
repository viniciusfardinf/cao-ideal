import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CONFIGURAÇÃO DE CORS (LIBERAÇÃO TOTAL)
  // Isso garante que qualquer domínio (como o da Vercel) consiga consultar sua API na Render
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. PREFIXO GLOBAL
  // Garante que todas as rotas comecem com /api/v1 (ex: /api/v1/recommendations)
  app.setGlobalPrefix('api/v1');

  // 3. VALIDAÇÃO GLOBAL
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true, 
    })
  );

  // 4. DOCUMENTAÇÃO SWAGGER
  const config = new DocumentBuilder()
    .setTitle('CãoIdeal API')
    .setDescription('Manual interativo para descobrir a raça de cachorro ideal')
    .setVersion('1.0')
    .addTag('recommendations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 5. PORTA DINÂMICA PARA CLOUD (RENDER)
  // A Render exige que usemos process.env.PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log('--------------------------------------------------');
  console.log(`🚀 API ONLINE: http://localhost:${port}/api/v1`);
  console.log(`📖 SWAGGER: http://localhost:${port}/docs`);
  console.log('--------------------------------------------------');
}
bootstrap();