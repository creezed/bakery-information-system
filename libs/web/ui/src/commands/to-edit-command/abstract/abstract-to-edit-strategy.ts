export abstract class AbstractToEditStrategy<TParams> {
  abstract open(params: TParams): void;
}
