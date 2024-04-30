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

  return { units };
}
