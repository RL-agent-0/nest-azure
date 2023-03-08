import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
