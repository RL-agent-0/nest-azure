import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

  async create(createCatDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createCatDto);
    return createdBlog.save();
  }
  async findAll(): Promise<Blog[]> {
    console.log(this.blogModel)
    return this.blogModel.find().exec();
  }
}
