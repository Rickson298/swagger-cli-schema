import type { APIMethods } from '../types';

export function getApiMethods(path: string): APIMethods[] {
  const regex = /(?:\[\d+m)?(GET|POST|PUT|PATCH|DELETE)(?:\[0m)?/g;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const methods = [...path.matchAll(regex)].map(
    (match) => match[1].toLowerCase() as APIMethods,
  );

  return methods;
}
