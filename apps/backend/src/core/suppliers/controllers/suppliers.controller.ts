import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SuppliersService } from '../services/suppliers.service';
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
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { Supplier } from '../../../models/supplier.model';

@ApiTags('Suppliers')
@Controller('supplier')
export class SuppliersController {
  constructor(public supplierService: SuppliersService) {}

  @Get()
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiOkPaginatedResponse(Supplier)
  @ApiOperation({ summary: 'get all suppliers' })
  public getAll(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<Supplier>> {
    return this.supplierService.findMany(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success', type: Supplier })
  @ApiOperation({ summary: 'get one supplier' })
  public getOne(@Param('id') id: string): Promise<Supplier> {
    return this.supplierService.findOne({ where: { id } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete supplier' })
  @ApiOkResponse({
    description: 'Resource deleted successfully',
    type: Supplier,
  })
  public delete(@Param('id') id: string): Promise<Supplier> {
    return this.supplierService.delete(id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new supplier' })
  @ApiCreatedResponse({ description: 'Successful create', type: Supplier })
  @ApiBody({
    type: CreateSupplierDto,
    description: 'Json structure for supplier object',
  })
  public create(@Body() dto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update supplier' })
  @ApiOkResponse({ type: Supplier })
  public patch(@Param('id') id: string, @Body() dto: JsonPatchDto) {
    return this.supplierService.patch(id, dto);
  }
}
