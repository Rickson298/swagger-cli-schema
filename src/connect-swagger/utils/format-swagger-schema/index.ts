// Constants
import { ARRAY_ID, REQUIRED_ID } from './constants';

// Types
import type { ParsedSchema } from 'src/shared/types/schema-types';
import type { ApiSchema } from 'swagger-client';

export function formatSwaggerSchema(
  param: ApiSchema,
  requiredFieldsParam: string[],
): ParsedSchema {
  // Recursively format the response object
  if (param?.type === 'object' && param.properties) {
    param = param.properties;

    formatSwaggerSchema(param, requiredFieldsParam);
  } else {
    // Iterate over the object properties
    for (const key in param) {
      const newParam = param as Record<string, ApiSchema>;
      const keyValue = newParam[key];

      const requiredFields = requiredFieldsParam;

      const isEmptyObject =
        param?.type === 'object' && param?.description === 'empty object';

      let newKey = key;

      if (requiredFields?.includes(key)) {
        newKey = newKey + REQUIRED_ID;
      }

      if (isEmptyObject) {
        param = {};
        break;
      }

      // Object types
      if (keyValue.type === 'object') {
        if (keyValue.required?.includes(key)) {
          newKey = newKey + REQUIRED_ID;
        }

        newParam[key] = keyValue.properties as ApiSchema;
        formatSwaggerSchema(keyValue, requiredFields);
        continue;
      }

      // Array types
      if (keyValue.type === 'array' && keyValue.items) {
        if (keyValue.required?.includes(key)) {
          newKey = newKey + REQUIRED_ID;
        }

        newKey = newKey + ARRAY_ID;
        const arrayItems = keyValue.items;

        const isArrayOfObjects = arrayItems.type === 'object';

        if (isArrayOfObjects) {
          // Array of objects
          newParam[newKey] = formatSwaggerSchema(arrayItems, requiredFields);
          delete newParam[key];
        } else {
          // Array of primitive types
          newParam[newKey] = jsTypesReplacer(arrayItems.type) as ApiSchema;
          delete newParam[key];
        }

        continue;
      }

      // Primitive types
      delete newParam[key];
      newParam[newKey] = jsTypesReplacer(keyValue.type) as ApiSchema;
    }
  }

  return param as ParsedSchema;
}

export function jsTypesReplacer(foreignType?: string) {
  if (foreignType === 'integer') {
    return 'number';
  }
  return foreignType;
}
