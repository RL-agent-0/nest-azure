import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from '../schemas/blog.schema';
import { OpenaiService } from 'src/utils/openai/openai.service';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService, OpenaiService, CloudinaryService]
})
export class BlogsModule { }
