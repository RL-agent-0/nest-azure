import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import { OpenaiService } from './utils/openai/openai.service';
import { CloudinaryService } from './utils/cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BlogsModule],
  controllers: [AppController],
  providers: [AppService, OpenaiService, CloudinaryService],
})
export class AppModule { }
