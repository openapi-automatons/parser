import {OpenapiSchema} from '@automatons/tools';

const inferType = (value: unknown): string =>
  typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'string';

/**
 * Normalize OpenAPI 3.1 (JSON Schema 2020-12) schema constructs into the 3.0-style
 * model the extractors understand. Idempotent.
 *
 * - `type: ["X", "null"]`      -> `{type: "X", nullable: true}`
 * - `type: ["X", "Y"]`         -> `{anyOf: [{type: "X"}, {type: "Y"}]}`
 * - `type: ["X", "Y", "null"]` -> `{anyOf: [...], nullable: true}`
 * - `const: V`                 -> `{enum: [V]}` (type inferred from V when absent)
 *
 * Out of scope: a sole `type: ["null"]` / `const: null` (returned unchanged), and other
 * 2020-12 keywords (prefixItems, patternProperties, ...).
 */
export const normalizeSchema = (raw: OpenapiSchema): OpenapiSchema => {
  const loose = raw as Record<string, unknown>;

  if (Array.isArray(loose.type)) {
    const types = loose.type as string[];
    const hasNull = types.includes('null');
    const nonNull = types.filter((type) => type !== 'null');
    if (nonNull.length === 0) return raw;
    const nullable = hasNull || Boolean(loose.nullable);
    const rest: Record<string, unknown> = {...loose};
    delete rest.type;
    if (nonNull.length === 1) {
      return {...rest, type: nonNull[0], nullable} as unknown as OpenapiSchema;
    }
    return {...rest, anyOf: nonNull.map((type) => ({type})), nullable} as unknown as OpenapiSchema;
  }

  if (loose.const !== undefined && loose.const !== null) {
    const value = loose.const;
    const rest: Record<string, unknown> = {...loose};
    delete rest.const;
    return {...rest, type: (loose.type as string | undefined) ?? inferType(value), enum: [value]} as unknown as OpenapiSchema;
  }

  return raw;
};
