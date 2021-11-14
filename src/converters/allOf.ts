import type {OpenapiSchemaAllOf} from '@automatons/tools';
import type {AllOfSchema, Schema} from '../types';
import {convertSchema} from './schema';

export const convertAllOf = (schema: OpenapiSchemaAllOf, schemas: Schema[]): AllOfSchema => ({
  type: 'allOf',
  ...convertSchema(schema),
  schemas,
});
