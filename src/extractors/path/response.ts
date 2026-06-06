import {OpenapiMap, OpenapiPathResponse, OpenapiReference, referenceSchema} from '@automatons/tools';
import {extractSchema, ExtractSchemaResult} from '../schema';
import {extractMediaType} from './mediaType';
import {extractStatus} from './status';
import {PathContext} from './type';

export const extractResponse =
  async (schema: OpenapiMap<OpenapiPathResponse | OpenapiReference>,
    method: string,
    context: PathContext): Promise<ExtractSchemaResult | void> => {
    const status = extractStatus(schema);
    const response = await referenceSchema(schema[status]!, context);
    const content = response.content;
    if (!content || !Object.keys(content).length) return;
    const resSchema = content[extractMediaType(content)]?.schema;
    if (!resSchema) return;
    return extractSchema([...context.path.split('/'), method, 'Response'].join(' '),
      resSchema, context);
  };
