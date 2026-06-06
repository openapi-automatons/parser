import {AutomatonContext} from '@automatons/tools';
import {CookieParameter, HeaderParameter, Model, Path, PathParameter, QueryParameter, Schema} from '../../types';

export type PathContext = { path: string } & AutomatonContext;
export type ParameterResult = {
  parameters: PathParameter[],
  queries: QueryParameter[],
  headers: HeaderParameter[],
  cookies: CookieParameter[],
  querystring?: Schema,
  models: Model[],
  imports: Model[]
};
export type PathReturn = { tags: string[], path: Path, models: Model[], imports: Model[] };
