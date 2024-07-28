import type { APIMethods } from '../types';

const METHOD_COLORS = {
  get: '\x1b[32m', // green to GET
  post: '\x1b[34m', // blue to POST
  put: '\x1b[33m', // yellow to PUT
  delete: '\x1b[31m', // red to DELETE
  patch: '\x1b[36m', // cyan to PATCH
};

export function getColorizedApiMethod(method: APIMethods) {
  if (METHOD_COLORS[method]) {
    return METHOD_COLORS[method] + method.toUpperCase() + '\x1b[0m';
  } else {
    return method.toUpperCase();
  }
}
