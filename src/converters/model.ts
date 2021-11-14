import {camelCase, pascalCase} from 'change-case';
import type {Model, Schema} from '../types';

export const convertModel = (title: string, schema: Schema, imports: Model[] = []): Model => ({
  title: pascalCase(title),
  filename: camelCase(title),
  imports,
  schema,
});
