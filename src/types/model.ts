export type Schema =
  StringSchema
  | IntegerSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | AllOfSchema
  | OneOfSchema
  | ModelSchema;

export interface Model {
  filename: string;
  title: string;
  imports: Model[];
  schema: Schema;
}

export interface SchemaCommon {
  description?: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  example?: any;
  defaultValue?: any;
}

export interface StringSchema extends SchemaCommon {
  type: 'string';
  format?: 'date' | 'date-time' | 'password' | 'byte' | 'binary' | 'url' | string;
  enum?: string[];
  examples?: Example<string>[];
  default?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface IntegerSchema extends SchemaCommon {
  type: 'integer';
  format?: 'int32' | 'int64' | 'float' | 'double';
  enum?: number[];
  examples?: Example<number>[];
  default?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  multipleOf?: number;
}

export interface NumberSchema extends SchemaCommon {
  type: 'number';
  format?: 'float' | 'double' | string;
  enum?: number[];
  examples?: Example<number>[];
  default?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  multipleOf?: number;
}

export interface BooleanSchema extends SchemaCommon {
  type: 'boolean';
  default?: boolean;
}

export interface ObjectSchema extends SchemaCommon {
  type: 'object';
  discriminate?: string;
  properties?: Property[];
  examples?: Example<object>[];
  default?: object;
}

export interface Property {
  name: string;
  required: boolean;
  schema: Schema;
}

export interface ArraySchema extends SchemaCommon {
  type: 'array';
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
  items?: Schema;
  examples?: Example<any[]>[];
}

export interface AllOfSchema extends SchemaCommon {
  type: 'allOf';
  examples?: Example[];
  schemas: Schema[];
}

export interface OneOfSchema extends SchemaCommon {
  type: 'oneOf';
  examples?: Example[];
  schemas: Schema[];
}

export interface ModelSchema extends SchemaCommon {
  type: 'model';
  name: string;
}

type Example<T = any> = {
  name: string;
  value: T
}
