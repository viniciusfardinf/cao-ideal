import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilita o CORS primeiro para garantir que o frontend consiga conectar
  app.enableCors();

  // 2. Define o prefixo global corretamente (removido o erro 'pp')
  app.setGlobalPrefix('api/v1');

  // 3. Configura a validação global de dados (importante para os DTOs)
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
  
  // O Swagger ficará acessível em http://localhost:3000/docs
  SwaggerModule.setup('docs', app, document);

  // 5. Inicia o servidor na porta 3000
  await app.listen(3000);
  
  console.log('--------------------------------------------------');
  console.log('🚀 API rodando em: http://localhost:3000/api/v1');
  console.log('📖 Manual (Swagger) em: http://localhost:3000/docs');
  console.log('--------------------------------------------------');
}
bootstrap();