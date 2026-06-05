import {OpenapiSchema} from '@automatons/tools';
import {normalizeSchema} from './normalize';

const normalize = (schema: unknown) => normalizeSchema(schema as OpenapiSchema) as Record<string, unknown>;

it('converts type [X, null] to nullable single type', () => {
  expect(normalize({type: ['string', 'null']})).toEqual({type: 'string', nullable: true});
});

it('preserves sibling keywords on nullable single type', () => {
  expect(normalize({type: ['string', 'null'], format: 'date'}))
    .toEqual({type: 'string', format: 'date', nullable: true});
});

it('converts a multi type to anyOf', () => {
  expect(normalize({type: ['string', 'number']}))
    .toEqual({anyOf: [{type: 'string'}, {type: 'number'}], nullable: false});
});

it('converts a multi type with null to anyOf + nullable', () => {
  expect(normalize({type: ['string', 'number', 'null']}))
    .toEqual({anyOf: [{type: 'string'}, {type: 'number'}], nullable: true});
});

it('converts const string to a single-value enum', () => {
  expect(normalize({const: 'active'})).toEqual({type: 'string', enum: ['active']});
});

it('converts const number to a single-value enum', () => {
  expect(normalize({const: 5})).toEqual({type: 'number', enum: [5]});
});

it('converts const boolean to a single-value enum', () => {
  expect(normalize({const: true})).toEqual({type: 'boolean', enum: [true]});
});

it('keeps an explicit type alongside const', () => {
  expect(normalize({type: 'string', const: 'x'})).toEqual({type: 'string', enum: ['x']});
});

it('passes a normal schema through unchanged and is idempotent', () => {
  const schema = {type: 'string', format: 'date'};
  expect(normalize(schema)).toEqual(schema);
  expect(normalize(normalize(schema))).toEqual(schema);
});
