import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UnitsService } from '../services/units.service';
import { Unit } from '../../../models/unit.model';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiOkPaginatedResponse,
  Paginate,
  Paginated,
  PaginateQuery,
} from '@bakery-information-system/paginator';
import { JsonPatchDto } from '../../../dtos';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @ApiOkPaginatedResponse(Unit)
  @ApiOperation({ summary: 'get all units' })
  public getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Unit>> {
    return this.unitsService.findMany(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success', type: Unit })
  @ApiOperation({ summary: 'get one unit' })
  public getOne(@Param('id') id: string): Promise<Unit> {
    return this.unitsService.findOne({ where: { id } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete unit' })
  @ApiOkResponse({
    description: 'Resource deleted successfully',
    type: Unit,
  })
  public delete(@Param('id') id: string): Promise<Unit> {
    return this.unitsService.delete(id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new unit' })
  @ApiCreatedResponse({ description: 'Successful create', type: Unit })
  @ApiBody({
    type: CreateUnitDto,
    description: 'Json structure for unit object',
  })
  public create(@Body() dto: CreateUnitDto): Promise<Unit> {
    return this.unitsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update unit' })
  @ApiOkResponse({ type: Unit })
  public patch(@Param('id') id: string, @Body() dto: JsonPatchDto) {
    return this.unitsService.patch(id, dto);
  }
}
