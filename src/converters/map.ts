import type {OpenapiMap} from '@automatons/tools';

export type ArrayMapItem<T> = {
  key: string;
  schema: T;
}

export const convertMap = <T = any>(map: OpenapiMap<T> = {}): Array<ArrayMapItem<T>> =>
  Object.keys(map).map((key) => ({key, schema: map[key]}));
