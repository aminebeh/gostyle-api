import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from './qrcode/brand/brand.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { Coupon } from './qrcode/coupon/entities/coupon.entity';
import { Brand } from './qrcode/brand/entities/brand.entity';
import { Picture } from './fileupload/entities/picture.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.prod', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'db_name',
      entities: [Coupon, Brand, Picture],
      synchronize: true,
    }),
    BrandModule,
    FileuploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
