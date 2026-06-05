import {OpenapiSchemaAnyOf} from '@automatons/tools';
import {AnyOfSchema, Schema} from '../types';
import {convertSchema} from './schema';

export const convertAnyOf = (schema: OpenapiSchemaAnyOf, schemas: Schema[]): AnyOfSchema => ({
  type: 'anyOf',
  ...convertSchema(schema),
  schemas,
});
