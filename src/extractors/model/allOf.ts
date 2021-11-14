import {AutomatonContext, OpenapiSchemaAllOf} from '@automatons/tools';
import {convertAllOf} from '../../converters/allOf';
import {convertModel} from '../../converters/model';
import {extractOfModel} from './of';
import {ExtractModel} from './type';

export const extractAllOfModel =
  async (title: string, schema: OpenapiSchemaAllOf, context: AutomatonContext): Promise<ExtractModel> => {
    const {models, schemas, imports} = await extractOfModel(title, schema.allOf, context);
    return {model: convertModel(title, convertAllOf(schema, schemas), imports), insides: models};
  };
