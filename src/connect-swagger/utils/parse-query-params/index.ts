// Libs
import type { RequestParameters } from 'swagger-client';

// Types
import { jsTypesReplacer } from '../format-swagger-schema';
import type {
  ParsedSchema,
  SchemaPrimitiveType,
} from 'src/shared/types/schema-types';

// Constants
import { ARRAY_ID, REQUIRED_ID } from '../format-swagger-schema/constants';

export function parseURLParams(queryParams: RequestParameters[]): ParsedSchema {
  const formattedQueryParams: ParsedSchema = {};

  for (const key in queryParams) {
    const queryParam = queryParams[key];

    let keyName = queryParam.name;

    if (queryParam.schema.type === 'array') {
      keyName = keyName + ARRAY_ID;
    }

    if (queryParam.required) {
      keyName = keyName + REQUIRED_ID;
    }

    formattedQueryParams[keyName] = jsTypesReplacer(
      queryParam.schema?.items?.type || queryParam.schema.type,
    ) as SchemaPrimitiveType;
  }

  return formattedQueryParams;
}
