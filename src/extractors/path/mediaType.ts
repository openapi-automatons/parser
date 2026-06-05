import {OpenapiMap, OpenapiPathMedia} from '@automatons/tools';

export const extractMediaType = (schema: OpenapiMap<OpenapiPathMedia>): keyof OpenapiMap<OpenapiPathMedia> =>
  Object.hasOwn(schema, 'application/json') ?
    'application/json' :
    Object.hasOwn(schema, 'application/*') ?
      'application/*' :
      Object.hasOwn(schema, 'default') ?
        'default' : Object.keys(schema)[0];
