import type {SchemaCommon} from '../types';
import type {OpenapiSchema} from '@automatons/tools';

export const convertSchema = (schema: OpenapiSchema): SchemaCommon => ({
  description: schema.description,
  nullable: schema.nullable,
  readOnly: schema.readOnly,
  writeOnly: schema.writeOnly,
  deprecated: schema.deprecated,
  example: schema.example,
  defaultValue: schema.default,
});
