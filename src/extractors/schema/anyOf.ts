import {AutomatonContext, OpenapiSchemaAnyOf} from '@automatons/tools';
import {convertSchemaModel} from '../../converters/schemaModel';
import {extractModel} from '../model';
import {convertModel} from '../../converters/model';

export const extractAnyOfSchema = async (title: string, schema: OpenapiSchemaAnyOf, context: AutomatonContext) => {
  const modelSchema = convertSchemaModel(title, schema);
  const {model, insides} = await extractModel(title, schema, context);
  return {
    schema: modelSchema,
    models: [model, ...insides],
    imports: [convertModel(title, modelSchema)],
  };
};
