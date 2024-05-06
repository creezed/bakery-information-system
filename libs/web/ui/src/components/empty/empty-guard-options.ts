import { tuiCreateToken, tuiProvideOptions } from '@taiga-ui/cdk';

export interface EmptyGuardOptions {
  readonly title: string;
  readonly lottieSrc: string;
  readonly paragraph: string;
  readonly buttonText: string;
}

const EMPTY_GUARD_DEFAULT_OPTIONS: EmptyGuardOptions = {
  title: 'Данные не обнаружены',
  paragraph: 'В системе пока не создано ни одного элемента',
  lottieSrc: 'assets/lottie/empty-lottie.json',
  buttonText: 'Создать',
};

export const EMPTY_GUARD_OPTIONS = tuiCreateToken(EMPTY_GUARD_DEFAULT_OPTIONS);

export function provideEmptyGuardOptions(options: Partial<EmptyGuardOptions>) {
  return tuiProvideOptions(
    EMPTY_GUARD_OPTIONS,
    options,
    EMPTY_GUARD_DEFAULT_OPTIONS
  );
}
