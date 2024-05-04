import type { SwaggerPaths } from 'swagger-client';
import { getColorizedApiMethod } from './get-colorized-api-method';
import type { APIMethods } from './types';

export function getColorizedPaths(paths: SwaggerPaths) {
  const parsedPaths = [];

  for (const key in paths) {
    const apiMethods = Object.keys(paths[key]).filter(
      (method) => method !== 'servers',
    );

    let colorizedAPIMethods = '';

    for (const method of apiMethods) {
      colorizedAPIMethods += getColorizedApiMethod(method as APIMethods) + ' ';
    }

    parsedPaths.push(`${colorizedAPIMethods} ${key}`);
  }

  return parsedPaths;
}
