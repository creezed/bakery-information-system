import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JsonPatchDto, PaginatedQueryDto } from '../../../dtos';
import {
  ApiOkPaginatedResponse,
  Paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';
import { IngredientsService } from '../services/ingredients.service';
import { Ingredient } from '../../../models/ingredient.model';
import { CreateIngredientDto } from '../dtos';
import { CheckUniqueModel } from '../../../models/check-unique.model';

@ApiTags('Ingredients')
@Controller('ingredient')
export class IngredientsController {
  constructor(public ingredientsService: IngredientsService) {}

  @Get()
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiOkPaginatedResponse(Ingredient)
  @ApiOperation({ summary: 'get ingredients' })
  public getAll(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<Ingredient>> {
    return this.ingredientsService.findMany(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success', type: Ingredient })
  @ApiOperation({ summary: 'get one ingredient' })
  public getOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsService.findOne({ where: { id } });
  }

  @Get('check-unique/:article')
  @ApiOkResponse({ description: 'Success', type: CheckUniqueModel })
  @ApiOperation({ summary: 'check unique article' })
  public checkUniqueArticle(
    @Param('article') article: string
  ): Promise<CheckUniqueModel> {
    return this.ingredientsService.checkUniqueArticle(article);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete ingredient' })
  @ApiOkResponse({
    description: 'Resource deleted successfully',
    type: Ingredient,
  })
  public delete(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsService.delete(id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new ingredient' })
  @ApiCreatedResponse({ description: 'Successful create', type: Ingredient })
  @ApiBody({
    type: CreateIngredientDto,
    description: 'Json structure for ingredient object',
  })
  public create(@Body() dto: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update ingredient' })
  @ApiOkResponse({ type: Ingredient })
  public patch(@Param('id') id: string, @Body() dto: JsonPatchDto) {
    return this.ingredientsService.patch(id, dto);
  }
}
