import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { ContentService } from './content.service'
import { CreateContentDto, FeedQueryDto, ComprehensionFeedbackDto, UpdateContentDto } from './content.dto'

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async list(
    @Query('language') language?: string,
    @Query('level') level?: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    const [items, total] = await this.contentService.findAll(
      language,
      level,
      limit ? parseInt(String(limit), 10) : 20,
      offset ? parseInt(String(offset), 10) : 0,
    )
    return { items, total }
  }

  @Get('feed')
  async feed(@Query() query: FeedQueryDto) {
    return this.contentService.getFeed(query)
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.contentService.findOne(id)
  }

  @Post()
  async create(@Body() dto: CreateContentDto) {
    return this.contentService.create(dto)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.contentService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.contentService.remove(id)
    return { ok: true }
  }

  @Post(':id/feedback')
  async feedback(@Param('id') id: string, @Body() body: ComprehensionFeedbackDto) {
    await this.contentService.submitFeedback(id, body.comprehension)
    return { ok: true }
  }
}
