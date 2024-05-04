import type { SwaggerPath } from 'swagger-client';
import type { APIMethods } from '../types';

export function swaggerPathFormatter(path: SwaggerPath, method: APIMethods) {
  // const methodInfos = path[method];

  const pathMethods = Object.keys(path);
  let params: Record<string, unknown> = {};
  let response = {};

  if (path.post && method === 'post') {
    params = path.post.requestBody.content['application/json'].schema;
  } else {
    params = path?.[method]?.parameters;
  }

  response = path?.[method]?.responses[200].content['application/json'].schema;

  return {
    params,
    pathMethods,
    response,
  };

  // const params = methodInfos?.summary
}
