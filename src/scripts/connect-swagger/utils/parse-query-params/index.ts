// Libs
import type { RequestParameters } from 'swagger-client';

// Types
import { jsTypesReplacer } from '../format-swagger-schema';

type FormattedQueryParam = {
  [key: string]: {
    in?: string;
    required?: boolean;
    type?: string;
  };
};

export function parseURLParams(queryParams: RequestParameters[]) {
  const formattedQueryParams: FormattedQueryParam = {};

  for (const key in queryParams) {
    const queryParam = queryParams[key];

    formattedQueryParams[queryParam.name] = {
      type: jsTypesReplacer(queryParam.schema.type),
      in: queryParam.in,
      required: Boolean(queryParam.required),
    };
  }

  return formattedQueryParams;
}
