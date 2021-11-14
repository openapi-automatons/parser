import {AutomatonContext, OpenapiSchemaArray} from '@automatons/tools';
import {pascalCase} from 'change-case';
import {convertArray} from '../../converters/array';
import {convertModel} from '../../converters/model';
import {extractSchema} from '../schema';
import {ExtractModel} from './type';

export const extractArrayModel =
  async (title: string, schema: OpenapiSchemaArray, context: AutomatonContext): Promise<ExtractModel> => {
    if (schema.items) {
      const {schema: shm, models, imports} =
        await extractSchema(pascalCase([title, 'Item'].join(' ')), schema.items, context);
      return {model: convertModel(title, convertArray(schema, shm), imports), insides: models};
    }
    return {model: convertModel(title, convertArray(schema)), insides: []};
  };
