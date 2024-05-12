import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../../../prisma';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';
import { JsonPatchDto } from '../../../dtos';
import { applyReducer } from 'fast-json-patch/commonjs/core';
import { Ingredient } from '../../../models/ingredient.model';
import { CreateIngredientDto } from '../dtos';
import { UnitsService } from '../../units/services/units.service';
import { CheckUniqueModel } from '../../../models/check-unique.model';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly unitsService: UnitsService
  ) {}

  async findOne(args: Prisma.IngredientFindUniqueArgs): Promise<Ingredient> {
    const ingredient = await this.prismaService.client.ingredient.findUnique(
      args
    );

    if (!ingredient) {
      throw new BadRequestException('Ингредиент не найден');
    }

    return ingredient;
  }

  async findMany(query: PaginateQuery): Promise<Paginated<Ingredient>> {
    return paginate<Ingredient>({
      query,
      model: this.prismaService.client.ingredient,
      config: {
        sortableColumns: ['name', 'article'],
      },
    });
  }

  async checkUniqueArticle(article: string): Promise<CheckUniqueModel> {
    const ingredient = await this.prismaService.ingredient.findUnique({
      where: { article: article },
    });

    return {
      success: !ingredient,
    };
  }

  async delete(ingredientId: string): Promise<Ingredient> {
    const ingredient = await this.findOne({ where: { id: ingredientId } });

    return this.prismaService.client.ingredient.delete({ id: ingredient.id });
  }

  async patch(ingredientId: string, dto: JsonPatchDto): Promise<Ingredient> {
    const ingredient = await this.findOne({ where: { id: ingredientId } });

    const updatedIngredient = dto.patch.reduce(applyReducer, ingredient);

    return this.prismaService.client.ingredient.update({
      where: { id: ingredient.id },
      data: updatedIngredient,
    });
  }

  async create(dto: CreateIngredientDto): Promise<Ingredient> {
    const unit = await this.unitsService.findOne({ where: { id: dto.unitId } });

    const checkUniqueArticle = await this.checkUniqueArticle(dto.article);

    if (!checkUniqueArticle.success) {
      throw new BadRequestException(
        'Артикул ингредиента уже существует в системе'
      );
    }

    return this.prismaService.client.ingredient.create({
      data: {
        ...dto,
        unitId: unit.id,
      },
    });
  }
}
