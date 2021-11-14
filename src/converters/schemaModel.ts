import {OpenapiSchema} from '@automatons/tools';
import {pascalCase} from 'change-case';
import {ModelSchema} from '../types';
import {convertSchema} from './schema';

export const convertSchemaModel = (model: string, schema: OpenapiSchema): ModelSchema => ({
  type: 'model',
  name: pascalCase(model),
  ...convertSchema(schema),
});
