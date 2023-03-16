import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }
  async findAll(): Promise<Blog[]> {
    const blogs = await this.blogModel.find({}, { _id: 1, title: 1, description: 1, createdAt: 1 }).exec();
    return blogs
  }
  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      // Throw an error if the blog is not found
      throw new Error(`Blog with ID "${id}" not found`);
    }
    return blog;
  }
  async findWithCustomFields(fields: string): Promise<Blog[]> {
    const blogs = await this.blogModel.find({}, this.binaryStringToFieldsDict(fields)).exec();
    return blogs
  }

  binaryStringToFieldsDict(binaryString: string) {
    if (this.isBinaryString(binaryString) && binaryString.length <= Blog.numberOfFields) {
      binaryString = binaryString.padEnd(Blog.numberOfFields, "0")
      // Convert binary string to an array of characters
      const binaryArray = binaryString.split('');
      // Use the first five characters to represent the fields in the dictionary
      const [id, title, description, imageUrl, content, createdAt] = binaryArray.slice(0, binaryString.length);
      // Return the dictionary with the corresponding values from the binary string
      const result = {
        _id: +id,
        title: +title,
        description: +description,
        imageUrl: +imageUrl,
        content: +content,
        createdAt: +createdAt,
      }
      const dictWithOnes = {};
      const dictWithZeros = {};

      for (const [key, value] of Object.entries(result)) {
        if (value === 1) {
          dictWithOnes[key] = value;
        } else {
          dictWithZeros[key] = value;
        }
      }
      return dictWithOnes;
    }
    throw new TypeError("String is not binary");

  }
  isBinaryString(str: string): boolean {
    // Check if the string only contains 0 and 1 characters
    return /^[01]+$/.test(str);
  }
}
