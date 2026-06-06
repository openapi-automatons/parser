import {AutomatonContext, HTTP_METHODS, Method, OpenapiPath, OpenapiPathOperation} from '@automatons/tools';
import {PathReturn} from './type';
import {extractMethod} from './method';
import {isRef, referenceSchema} from '@automatons/tools';
import {omitCopy} from '../../utils/omitCopy';

type PathContext = { path: string } & AutomatonContext;

export const extractPath =
  async (schema: OpenapiPath, {path, openapi, settings}: PathContext): Promise<PathReturn[]> => {
    const _schema = isRef(schema) ?
      {...await referenceSchema(schema, {openapi, settings}), ...omitCopy(schema, '$ref')} :
      schema;
    const fixed = HTTP_METHODS
      .map<{ method: Method, operation: OpenapiPath | undefined }>((method) => ({method, operation: _schema[method]}))
      .filter<{ method: Method, operation: OpenapiPathOperation }>(
        (operation): operation is { method: Method, operation: OpenapiPathOperation } => !!operation.operation)
      .map(({method, operation}) => extractMethod(path, method, operation, _schema, {openapi, settings}));
    const additional = Object.entries(_schema.additionalOperations ?? {})
      .map(([method, operation]) => extractMethod(path, method.toLowerCase(), operation, _schema, {openapi, settings}));
    return Promise.all([...fixed, ...additional]);
  };
