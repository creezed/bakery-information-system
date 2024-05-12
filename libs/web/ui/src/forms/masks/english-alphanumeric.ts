import { MaskitoOptions } from '@maskito/core';

export const englishAlphanumericMask: MaskitoOptions = {
  mask: /^[a-zA-Z0-9]+$/,
  postprocessors: [
    ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
  ],
};
