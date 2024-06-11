import type { APIMethods } from '../types';

export function getApiMethods(path: string): APIMethods[] {
  const regex = /(?:\[\d+m)?(GET|POST|PUT|PATCH|DELETE)(?:\[0m)?/g;

  const methods = [...path.matchAll(regex)].map(
    (match) => match[1].toLowerCase() as APIMethods,
  );

  return methods;
}
