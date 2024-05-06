import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Prisma, PrismaService } from '../../../prisma';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';
import { JsonPatchDto } from '../../../dtos';
import { applyReducer } from 'fast-json-patch/commonjs/core';
import { Stock } from '../../../models/stock.model';
import { CreateStockDto } from '../dtos/create-stock.dto';

@Injectable()
export class StocksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(args: Prisma.StockFindUniqueArgs): Promise<Stock> {
    return this.prismaService.stock.findUnique(args);
  }

  async findMany(query: PaginateQuery): Promise<Paginated<Stock>> {
    return paginate<Stock>({
      query,
      model: this.prismaService.client.stock,
      config: {
        sortableColumns: ['code'],
      },
    });
  }

  async delete(stockId: string): Promise<Stock> {
    const stock = await this.findOne({ where: { id: stockId } });

    if (!stock) {
      throw new ConflictException(`Не найти склад с id ${stockId}`);
    }

    return this.prismaService.client.stock.delete({ id: stockId });
  }

  async patch(stockId: string, dto: JsonPatchDto): Promise<Stock> {
    const stock = await this.findOne({ where: { id: stockId } });
    if (!stock) {
      throw new BadRequestException('Склад не найден');
    }
    const updatedStock = dto.patch.reduce(applyReducer, stock);

    return this.prismaService.stock.update({
      where: { id: stock.id },
      data: updatedStock,
    });
  }

  async create(dto: CreateStockDto): Promise<Stock> {
    return this.prismaService.stock.create({ data: dto });
  }
}
