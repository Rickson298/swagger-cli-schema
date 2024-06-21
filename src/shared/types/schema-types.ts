export type SchemaPrimitiveType = 'string' | 'number' | 'boolean' | 'null';
export type ParsedSchema = {
  [key: string]: SchemaPrimitiveType | ParsedSchema;
};
