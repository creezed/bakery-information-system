import * as dotenv from 'dotenv';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Prisma, PrismaClient } from './prisma/generated-prisma-client';

const prisma = new PrismaClient();

if (require.main === module) {
  main()
    .then(console.log)
    .catch((e) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const units: Prisma.UnitCreateInput[] = [
    {
      code: '796',
      name: 'шт',
      fullName: 'Штука',
    },
    {
      code: '166',
      name: 'кг',
      fullName: 'Килограмм',
    },
    {
      code: '112',
      name: 'л',
      fullName: 'Литр',
    },
  ];

  await Promise.all(
    units.map((unit) =>
      prisma.unit.create({
        data: unit,
      })
    )
  );

  const stocks: Prisma.StockCreateInput[] = [
    {
      code: 'BK001',
      name: 'Склад для хранения муки и зерна',
      description:
        'Этот склад предназначен для хранения основных ингредиентов, таких как мука, зерно и другое сырье, необходимое для производства хлебобулочных изделий. Он оборудован специальными стеллажами и системами контроля температуры и влажности для поддержания оптимальных условий хранения.',
    },
    {
      code: 'BK002',
      name: 'Склад для хранения готовой продукции',
      description:
        'Данный склад используется для временного хранения и распределения готовой хлебобулочной продукции перед отправкой в торговые точки. Он оснащен стеллажами, холодильными камерами и системами контроля качества для обеспечения свежести и сохранности изделий.',
    },
    {
      code: 'BK003',
      name: 'Склад для хранения упаковочных материалов',
      description:
        'Этот склад предназначен для хранения различных упаковочных материалов, таких как пакеты, коробки, этикетки и другие принадлежности, необходимые для упаковки готовой продукции. Он организован таким образом, чтобы обеспечивать быстрый доступ к необходимым материалам для эффективной упаковки и отгрузки хлебобулочных изделий',
    },
  ];

  await Promise.all(
    stocks.map((stock) => prisma.stock.create({ data: stock }))
  );

  return { units, stocks };
}
