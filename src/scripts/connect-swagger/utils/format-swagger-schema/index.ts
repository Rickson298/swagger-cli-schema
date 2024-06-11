import type { ResponseProperty } from 'swagger-client';

export function formatSwaggerSchema(param: ResponseProperty) {
  // Recursively format the response object
  if (param?.type === 'object' && param.properties) {
    param = param.properties;

    formatSwaggerSchema(param);
  } else {
    // Iterate over the object properties
    for (const key in param) {
      const newParam = param as Record<string, ResponseProperty>;

      const keyValue = newParam[key];
      const isEmptyObject =
        param?.type === 'object' && param?.description === 'empty object';

      if (isEmptyObject) {
        param = {};
        break;
      }

      // Object types
      if (keyValue.type === 'object') {
        newParam[key] = keyValue.properties as ResponseProperty;
        formatSwaggerSchema(keyValue);
        continue;
      }

      // Array types
      if (keyValue.type === 'array' && keyValue.items) {
        const arrayItems = keyValue.items;

        const isArrayOfObjects = arrayItems.type === 'object';

        if (isArrayOfObjects) {
          // Array of objects
          newParam[key + '[]'] = formatSwaggerSchema(arrayItems);
          delete newParam[key];
        } else {
          // Array of primitive types
          newParam[key + '[]'] = jsTypesReplacer(
            arrayItems.type,
          ) as ResponseProperty;
          delete newParam[key];
        }

        continue;
      }

      // Primitive types
      newParam[key] = jsTypesReplacer(keyValue.type) as ResponseProperty;
    }
  }

  return param;
}

export function jsTypesReplacer(foreignType?: string) {
  if (foreignType === 'integer') {
    return 'number';
  }
  return foreignType;
}
