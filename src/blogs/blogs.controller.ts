import { Controller, Get, Post, Body, Redirect } from '@nestjs/common';
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
    let title;
    let createdBlog;
    try {
      const createCompletionResult = await this.openaiService.createCompletion();
      createdBlog = JSON.parse(createCompletionResult);
      title = createdBlog.title;
      const generatedImageResult = await this.openaiService.generateImage(title);
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
    } catch (error) {
      createdBlog = { title: 'Randomness' };
      console.error(error);
      return error
    }
    return this.create(createdBlog);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }
}
