import {AutomatonContext, OpenapiSchemaObject} from '@automatons/tools';
import {pascalCase} from 'change-case';
import {convertMap} from '../../converters/map';
import {convertModel} from '../../converters/model';
import {convertObjectSchema} from '../../converters/object';
import {Model} from '../../types';
import {extractSchema} from '../schema';
import {ExtractModel} from './type';

export const extractObjectModel =
  async (title: string, schema: OpenapiSchemaObject, context: AutomatonContext): Promise<ExtractModel> => {
    const models: Model[] = [];
    const imports: Model[] = [];
    const propertySchemas = schema.properties;
    const properties = await Promise.all(convertMap(propertySchemas)
      .map(async ({key, schema: propertySchema}) => {
        const extractPropertySchema = await extractSchema(pascalCase([title, key].join(' ')), propertySchema, context);
        models.push(...extractPropertySchema.models);
        imports.push(...(extractPropertySchema.imports ?? []));
        return {name: key, required: schema.required?.includes(key) ?? false, schema: extractPropertySchema.schema};
      }));
    return {model: convertModel(title, convertObjectSchema(schema, properties), imports), insides: models};
  };
