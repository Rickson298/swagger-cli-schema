export type ResponseProperty =
  | ObjectPropertyType
  | PrimitivePropertyType
  | ArrayPropertyType;

type ObjectPropertyType = {
  type?: 'object';
  properties?: Record<string, ResponseProperty>;
  description?: string;
};

type PrimitivePropertyType = {
  type?: 'string' | 'boolean' | 'integer' | 'null';
};

type ArrayPropertyType = {
  type?: 'array';
  items?: ResponseProperty;
};

export function formatResponse(param: ResponseProperty) {
  // Recursively format the response object
  if (param?.type === 'object' && param.properties) {
    param = param.properties;

    formatResponse(param);
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
        formatResponse(keyValue);
        continue;
      }

      // Array types
      if (keyValue.type === 'array' && keyValue.items) {
        const arrayItems = keyValue.items;

        const isArrayOfObjects = arrayItems.type === 'object';

        if (isArrayOfObjects) {
          // Array of objects
          newParam[key + '[]'] = formatResponse(arrayItems);
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

function jsTypesReplacer(foreignType?: string) {
  if (foreignType === 'integer') {
    return 'number';
  }
  return foreignType;
}
