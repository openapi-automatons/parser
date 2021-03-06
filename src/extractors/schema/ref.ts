import {OpenapiSchemaReference, referenceTitle} from '@automatons/tools';
import {convertSchemaModel} from '../../converters/schemaModel';
import {convertModel} from '../../converters/model';

export const extractRefSchema = (title: string, schema: OpenapiSchemaReference) => {
  const name = referenceTitle(schema) ?? title;
  const modelSchema = convertSchemaModel(name, schema);
  return {
    schema: modelSchema,
    models: [],
    imports: [convertModel(name, modelSchema)],
  };
};
