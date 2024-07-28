// Utils
import { isValidKey } from 'src/shared/utils/is-valid-object-key';
import { sanitizeKey } from './utils/sanitize-key';

// Types
import type { ParsedSchema } from 'src/shared/types/schema-types';

// Constants
import { ARRAY_ID, REQUIRED_ID } from '../format-swagger-schema/constants';

export function generateTypesBySchema(
  schema: ParsedSchema,
  serviceName?: string,
) {
  const stringifiedSchema = normalizeSchemaToString(schema);
  return `export type ${serviceName} = ${
    stringifiedSchema === ''
      ? 'Record<string, never>'
      : `{${stringifiedSchema}}`
  }`;
}

export function normalizeSchemaToString(schema: ParsedSchema) {
  let slotString = '';
  for (const key in schema) {
    const keyValue = schema[key];

    const parsedKey = isValidKey(key) ? key : `'${key}'`;
    let sanitizedKey = sanitizeKey(parsedKey);

    const isObjectType = typeof keyValue === 'object';

    if (parsedKey.includes(REQUIRED_ID)) {
      sanitizedKey = sanitizedKey + ':';
    } else {
      sanitizedKey = sanitizedKey + '?:';
    }

    if (parsedKey.includes(ARRAY_ID)) {
      const typeContent = isObjectType
        ? normalizeSchemaToString(keyValue)
        : keyValue;

      slotString += `${sanitizedKey} Array<${isObjectType ? `{${typeContent}}` : typeContent}>;\n`;
      delete schema[key];
    } else if (isObjectType) {
      slotString += `${sanitizedKey} {${normalizeSchemaToString(keyValue)}};\n`;
    } else {
      slotString += `${sanitizedKey} ${keyValue};\n`;
    }
  }

  return slotString;
}
