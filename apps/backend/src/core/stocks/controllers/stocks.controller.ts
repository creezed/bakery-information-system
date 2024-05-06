import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StocksService } from '../services/stocks.service';
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
import { Stock } from '../../../models/stock.model';
import { CreateStockDto } from '../dtos/create-stock.dto';

@ApiTags('Stocks')
@Controller('stocks')
export class StocksController {
  constructor(public stockService: StocksService) {}

  @Get()
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiOkPaginatedResponse(Stock)
  @ApiOperation({ summary: 'get all stocks' })
  public getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Stock>> {
    return this.stockService.findMany(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success', type: Stock })
  @ApiOperation({ summary: 'get one stock' })
  public getOne(@Param('id') id: string): Promise<Stock> {
    return this.stockService.findOne({ where: { id } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete stock' })
  @ApiOkResponse({
    description: 'Resource deleted successfully',
    type: Stock,
  })
  public delete(@Param('id') id: string): Promise<Stock> {
    return this.stockService.delete(id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new stock' })
  @ApiCreatedResponse({ description: 'Successful create', type: Stock })
  @ApiBody({
    type: CreateStockDto,
    description: 'Json structure for stock object',
  })
  public create(@Body() dto: CreateStockDto): Promise<Stock> {
    return this.stockService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update stock' })
  @ApiOkResponse({ type: Stock })
  public patch(@Param('id') id: string, @Body() dto: JsonPatchDto) {
    return this.stockService.patch(id, dto);
  }
}
