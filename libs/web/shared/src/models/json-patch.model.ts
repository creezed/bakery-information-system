export interface JsonPatchModel {
  from: string;
  op: string;
  path: string;
  value: [] | string | number | boolean | Record<string, unknown>;
}
