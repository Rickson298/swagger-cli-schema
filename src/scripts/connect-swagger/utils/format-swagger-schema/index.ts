// Constants
import { ARRAY_IDENTITY } from './constants';

// Types
import type { ParsedSchema } from 'src/shared/types/schema-types';
import type { ApiSchema } from 'swagger-client';

export function formatSwaggerSchema(param: ApiSchema): ParsedSchema {
  // Recursively format the response object
  if (param?.type === 'object' && param.properties) {
    param = param.properties;

    formatSwaggerSchema(param);
  } else {
    // Iterate over the object properties
    for (const key in param) {
      const newParam = param as Record<string, ApiSchema>;

      const keyValue = newParam[key];
      const isEmptyObject =
        param?.type === 'object' && param?.description === 'empty object';

      let newKey = key;

      if (isEmptyObject) {
        param = {};
        break;
      }

      // Object types
      if (keyValue.type === 'object') {
        newParam[key] = keyValue.properties as ApiSchema;
        formatSwaggerSchema(keyValue);
        continue;
      }

      // Array types
      if (keyValue.type === 'array' && keyValue.items) {
        newKey = newKey + ARRAY_IDENTITY;
        const arrayItems = keyValue.items;

        const isArrayOfObjects = arrayItems.type === 'object';

        if (isArrayOfObjects) {
          // Array of objects
          newParam[newKey] = formatSwaggerSchema(arrayItems);
          delete newParam[key];
        } else {
          // Array of primitive types
          newParam[newKey] = jsTypesReplacer(arrayItems.type) as ApiSchema;
          delete newParam[key];
        }

        continue;
      }

      // Primitive types
      newParam[key] = jsTypesReplacer(keyValue.type) as ApiSchema;
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
