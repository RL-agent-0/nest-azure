import { Controller, Get, Post, Body, Redirect, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { OpenaiService } from 'src/utils/openai/openai.service';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly openaiService: OpenaiService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post('create')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get('openai')
  async createMessage() {
    let createdBlog;
    try {
      const createCompletionResult = await this.openaiService.createCompletion();
      console.log(createCompletionResult)

      createdBlog = JSON.parse(createCompletionResult);
      const generatedImageResult = await this.openaiService.generateImage(createdBlog.title);
      const now = new Date();
      const filename = now.toLocaleString('sv-SE',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(/[-:\s]/g, '');

      const cloundiaryImageURL = await this.cloudinaryService.uploadImage(generatedImageResult, filename)
      createdBlog.imageUrl = cloundiaryImageURL;
      console.log(createdBlog)
    } catch (error) {
      console.error(error);
      return { "error": createdBlog }
    }
    return this.create(createdBlog);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get('find_custom/:fields')
  async findWithCustomFields(@Param('fields') fields: string) {
    try {
      const blogs = await this.blogsService.findWithCustomFields(fields);
      return blogs
    }
    catch (error) {
      return { error: "Somthing went wrong : " + error };
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.findById(id);
      return blog
    }
    catch (error) {
      return { error: 'Unable to find the blog with the provided ID.' };
    }
  }
}

/*    try {
      const blog = this.blogsService.findById(id);
      return blog
    }
    catch (error) {
      return { "error": error }
    }*/