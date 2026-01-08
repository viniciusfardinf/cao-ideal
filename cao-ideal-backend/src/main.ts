import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilita o CORS (Essencial para a Vercel conseguir acessar a Render)
  app.enableCors();

  // 2. Define o prefixo global
  app.setGlobalPrefix('api/v1');

  // 3. Configura a validação global de dados
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true, 
    })
  );

  // 4. CONFIGURAÇÃO DO SWAGGER (Documentação)
  const config = new DocumentBuilder()
    .setTitle('CãoIdeal API')
    .setDescription('Manual interativo para descobrir a raça de cachorro ideal')
    .setVersion('1.0')
    .addTag('recommendations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 5. AJUSTE PARA DEPLOY: Usa a porta da Render ou a 3000 (local)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log('--------------------------------------------------');
  console.log(`🚀 API rodando em: http://localhost:${port}/api/v1`);
  console.log(`📖 Manual (Swagger) em: http://localhost:${port}/docs`);
  console.log('--------------------------------------------------');
}
bootstrap();