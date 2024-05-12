interface UnitsOfMass {
  [name: string]: {
    readonly code: string;
    readonly fullName: string;
    readonly weightKg?: number;
  };
}

export const unitsOfMass: UnitsOfMass = {
  гг: {
    code: '160',
    fullName: 'Гектограмм',
  },
  мг: {
    code: '161',
    fullName: 'Миллиграмм',
  },
  кар: {
    code: '162',
    fullName: 'Метрический карат',
  },
  г: {
    code: '163',
    fullName: 'Грамм',
    weightKg: 0.001,
  },
  мкг: {
    code: '164',
    fullName: 'Микрограмм',
  },
  кг: {
    code: '166',
    fullName: 'Килограмм',
    weightKg: 1,
  },
  т: {
    code: '168',
    fullName: 'Тонна',
  },
  kt: {
    code: '170',
    fullName: 'Килотонна',
  },
  сг: {
    code: '173',
    fullName: 'Сантиграмм',
  },
  '-': {
    code: '181',
    fullName: 'Брутто-регистровая тонна',
  },
  ц: {
    code: '206',
    fullName: 'Центнер',
  },
};
