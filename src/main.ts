import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundFilter());
  await app
    .listen(port)
    .then(() =>
      console.log(`\r\nServer listening on http://localhost:${port}`),
    );
}

bootstrap();
