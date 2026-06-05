import {convertModel} from '../../converters/model';
import {convertAnyOf} from '../../converters/anyOf';
import {extractOfModel} from './of';
import {AutomatonContext, OpenapiSchemaAnyOf} from '@automatons/tools';

export const extractAnyOfModel = async (title: string, schema: OpenapiSchemaAnyOf, context: AutomatonContext) => {
  const {models, schemas, imports} = await extractOfModel(title, schema.anyOf, context);
  return {model: convertModel(title, convertAnyOf(schema, schemas), imports), insides: models};
};
