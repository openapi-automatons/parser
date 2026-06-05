import {
  AutomatonContext,
  isSchemaAllOf,
  isSchemaArray, isSchemaBoolean,
  isSchemaInteger,
  isSchemaNumber,
  isSchemaAnyOf,
  isSchemaObject,
  isSchemaOneOf,
  isSchemaRef,
  isSchemaString,
  OpenapiSchema,
} from '@automatons/tools';
import {Model, Schema} from '../../types';
import {extractNumberSchema} from './number';
import {extractArraySchema} from './array';
import {extractObjectSchema} from './object';
import {extractAllOfSchema} from './allOf';
import {extractOneOfSchema} from './oneOf';
import {extractAnyOfSchema} from './anyOf';
import {extractRefSchema} from './ref';
import {extractStringSchema} from './string';
import {extractBooleanSchema} from './boolean';
import {normalizeSchema} from '../../converters/normalize';

export type ExtractSchemaResult = { schema: Schema, models: Model[], imports?: Model[] };

export const extractSchema = async (title: string, raw: OpenapiSchema,
  context: AutomatonContext): Promise<ExtractSchemaResult> => {
  const schema = normalizeSchema(raw);
  if (isSchemaString(schema)) {
    return extractStringSchema(title, schema);
  } else if (isSchemaNumber(schema) || isSchemaInteger(schema)) {
    return extractNumberSchema(title, schema);
  } else if (isSchemaBoolean(schema)) {
    return extractBooleanSchema(title, schema);
  } else if (isSchemaArray(schema)) {
    return extractArraySchema(title, schema, context);
  } else if (isSchemaObject(schema)) {
    return extractObjectSchema(title, schema, context);
  } else if (isSchemaAllOf(schema)) {
    return extractAllOfSchema(title, schema, context);
  } else if (isSchemaOneOf(schema)) {
    return extractOneOfSchema(title, schema, context);
  } else if (isSchemaAnyOf(schema)) {
    return extractAnyOfSchema(title, schema, context);
  } else if (isSchemaRef(schema)) {
    return extractRefSchema(title, schema);
  }
  throw new Error(`Unknown type\n${JSON.stringify(schema, undefined, 2)}`);
};

