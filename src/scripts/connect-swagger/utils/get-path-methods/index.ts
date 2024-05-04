export function getApiMethods(path: string) {
  const regex = /(?:\[\d+m)?(GET|POST|PUT|PATCH|DELETE)(?:\[0m)?/g;

  const methods = [...path.matchAll(regex)].map((match) => match[1]);

  return methods;
}
