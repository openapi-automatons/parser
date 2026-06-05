import type {OpenapiMap} from '@automatons/tools';

export type ArrayMapItem<T> = {
  key: string;
  schema: T;
}

export const convertMap = <T = any>(map: OpenapiMap<T> = {}): Array<ArrayMapItem<T>> =>
  Object.entries(map).map(([key, schema]) => ({key, schema}));
