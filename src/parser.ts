import {AutomatonSettings, Openapi} from '@automatons/tools';
import {convertSecurity} from './converters/security';
import {parseApi} from './parsers/api';
import {parseModel} from './parsers/model';
import {Api, Model, Security} from './types';

export const parser =
  async (openapi: Openapi, settings: AutomatonSettings):
    Promise<{ models: Model[], apis: Api[], securities: Security[] }> => {
    const {apis, models} = await parseApi({openapi, settings});
    models.push(...await parseModel({openapi, settings}));
    const securities = Object.entries(openapi.components?.securitySchemes ?? {})
      .map(([key, schema]) => convertSecurity(key, schema, []))
      .filter<Security>((value): value is Security => value !== undefined);
    return {models, apis, securities};
  };
