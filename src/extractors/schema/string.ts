import {OpenapiSchemaString} from '@automatons/tools';
import {convertSchemaModel} from '../../converters/schemaModel';
import {convertModel} from '../../converters/model';
import {convertString} from '../../converters/string';

export const extractStringSchema = (title: string, schema: OpenapiSchemaString) => {
  if (schema.title) {
    const modelSchema = convertSchemaModel(title, schema);
    const models = [convertModel(title, convertString(schema))];
    return {schema: modelSchema, models, imports: models};
  }
  return {schema: convertString(schema), models: []};
};
