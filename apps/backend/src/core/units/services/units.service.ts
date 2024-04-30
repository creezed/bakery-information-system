import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../../../prisma';
import { Unit } from '../../../models/unit.model';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';

@Injectable()
export class UnitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(args: Prisma.UnitFindUniqueArgs): Promise<Unit> {
    return this.prismaService.unit.findUnique(args);
  }

  async findMany(query: PaginateQuery): Promise<Paginated<Unit>> {
    return paginate<Unit>({
      query,
      model: this.prismaService.unit,
      config: {
        sortableColumns: ['fullName', 'name', 'code'],
      },
    });
  }

  async delete(unitId: string): Promise<Unit> {
    const unit = await this.findOne({ where: { id: unitId } });

    if (!unit) {
      throw new ConflictException(`Не найти единицу измерения с id ${unitId}`);
    }

    return this.prismaService.unit.delete({
      where: {
        id: unitId,
      },
    });
  }

  async create(dto: CreateUnitDto): Promise<Unit> {
    return this.prismaService.unit.create({ data: dto });
  }
}
