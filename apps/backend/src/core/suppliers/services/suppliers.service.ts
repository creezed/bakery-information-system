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
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { Supplier } from '../../../models/supplier.model';

@Injectable()
export class SuppliersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(args: Prisma.SupplierFindUniqueArgs): Promise<Supplier> {
    return this.prismaService.client.supplier.findUnique(args);
  }

  async findMany(query: PaginateQuery): Promise<Paginated<Supplier>> {
    return paginate<Supplier>({
      query,
      model: this.prismaService.client.supplier,
      config: {
        sortableColumns: ['name'],
      },
    });
  }

  async delete(supplierId: string): Promise<Supplier> {
    const supplier = await this.findOne({ where: { id: supplierId } });

    if (!supplier) {
      throw new ConflictException(`Не найти поставщика с id ${supplierId}`);
    }

    return this.prismaService.client.supplier.delete({ id: supplier.id });
  }

  async patch(supplierId: string, dto: JsonPatchDto): Promise<Supplier> {
    const supplier = await this.findOne({ where: { id: supplierId } });
    if (!supplier) {
      throw new BadRequestException('Поставщик не найден');
    }
    const updatedSupplier = dto.patch.reduce(applyReducer, supplier);

    return this.prismaService.supplier.update({
      where: { id: supplier.id },
      data: updatedSupplier,
    });
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    return this.prismaService.client.supplier.create({ data: dto });
  }
}
