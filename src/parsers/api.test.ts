import {Openapi} from '@automatons/tools';
import {parseApi} from './api';

describe('api parser', () => {
  it('should be parse api', async () => {
    const {apis} = await parseApi({openapi: createOpenapi(), settings: {path: './', openapiPath: './', outDir: './'}});
    expect(apis).toEqual([{
      title: 'DefaultApi',
      filename: 'defaultApi',
      servers: [],
      imports: [],
      paths: [
        {
          method: 'get',
          name: 'getTests',
          parameters: [],
          queries: [],
          headers: [],
          cookies: [],
          path: 'tests',
          schema: {
            type: 'string',
            format: undefined,
            defaultValue: undefined,
            deprecated: undefined,
            description: undefined,
            enum: [],
            examples: undefined,
            nullable: undefined,
            readOnly: undefined,
            writeOnly: undefined,
          },
          servers: [],
        },
      ],
    }]);
  });

  it('should parse the 3.2 query method and additionalOperations', async () => {
    const openapi: Openapi = {
      openapi: '3.2.0',
      info: {title: 'test', version: '0.0.1'},
      paths: {
        tests: {
          query: {
            operationId: 'queryTests',
            requestBody: {content: {'application/json': {schema: {type: 'object'}}}},
            responses: {200: {description: 'ok', content: {'application/json': {schema: {type: 'string'}}}}},
          },
          additionalOperations: {
            PURGE: {operationId: 'purgeTests', responses: {200: {description: 'ok'}}},
          },
        },
      },
      components: {},
    };
    const {apis} = await parseApi({openapi, settings: {path: './', openapiPath: './', outDir: './'}});
    const paths = apis[0]!.paths;
    expect(paths.map((path) => path.method).sort()).toEqual(['purge', 'query']);
    const query = paths.find((path) => path.method === 'query')!;
    expect('forms' in query && (query.forms?.length ?? 0) > 0).toBe(true);
    const purge = paths.find((path) => path.method === 'purge')!;
    expect('forms' in purge).toBe(false);
  });

  it('should parse a 3.2 querystring parameter', async () => {
    const openapi: Openapi = {
      openapi: '3.2.0',
      info: {title: 'test', version: '0.0.1'},
      paths: {
        tests: {
          get: {
            operationId: 'searchTests',
            parameters: [{
              in: 'querystring',
              name: '',
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {type: 'object', properties: {q: {type: 'string'}}},
                },
              },
            }],
            responses: {200: {description: 'ok', content: {'application/json': {schema: {type: 'string'}}}}},
          },
        },
      },
      components: {},
    };
    const {apis} = await parseApi({openapi, settings: {path: './', openapiPath: './', outDir: './'}});
    const path = apis[0]!.paths[0]!;
    expect(path.querystring).toBeDefined();
    expect(path.querystring?.type).toBe('model');
  });
});

const createOpenapi = (): Openapi => ({
  openapi: '3.0.3',
  info: {
    title: 'test',
    version: '0.0.1',
  },
  paths: {
    tests: {
      get: {
        operationId: 'getTests',
        responses: {
          200: {
            description: 'test list',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
  components: {},
});
