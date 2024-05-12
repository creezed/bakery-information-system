import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../../../prisma';
import { Unit } from '../../../models/unit.model';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';
import { JsonPatchDto } from '../../../dtos';
import { applyReducer } from 'fast-json-patch/commonjs/core';

@Injectable()
export class UnitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(args: Prisma.UnitFindUniqueArgs): Promise<Unit> {
    const unit = await this.prismaService.client.unit.findUnique(args);

    if (!unit) {
      throw new BadRequestException('Единица измерения не найдена');
    }

    return unit;
  }

  async findMany(query: PaginateQuery): Promise<Paginated<Unit>> {
    return paginate<Unit>({
      query,
      model: this.prismaService.client.unit,
      config: {
        sortableColumns: ['fullName', 'name', 'code'],
      },
    });
  }

  async delete(unitId: string): Promise<Unit> {
    const unit = await this.findOne({ where: { id: unitId } });

    return this.prismaService.client.unit.delete({
      id: unit.id,
    });
  }

  async patch(unitId: string, dto: JsonPatchDto): Promise<Unit> {
    const unit = await this.findOne({ where: { id: unitId } });

    const updatedUnit = dto.patch.reduce(applyReducer, unit);

    return this.prismaService.unit.update({
      where: { id: unit.id },
      data: updatedUnit,
    });
  }

  async create(dto: CreateUnitDto): Promise<Unit> {
    return this.prismaService.unit.create({ data: dto });
  }
}
