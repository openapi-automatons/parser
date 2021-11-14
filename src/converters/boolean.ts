import type {BooleanSchema} from '../types';
import type {OpenapiSchemaBoolean} from '@automatons/tools';
import {convertSchema} from './schema';

export const convertBoolean = (schema: OpenapiSchemaBoolean): BooleanSchema => ({
  type: 'boolean',
  ...convertSchema(schema),
});
