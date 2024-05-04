import type { APIMethods } from '../types';

const METHOD_COLORS = {
  get: '\x1b[32m', // Verde para GET
  post: '\x1b[34m', // Azul para POST
  put: '\x1b[33m', // Amarelo para PUT
  delete: '\x1b[31m', // Vermelho para DELETE
};

export function getColorizedApiMethod(method: APIMethods) {
  if (METHOD_COLORS[method]) {
    return METHOD_COLORS[method] + method.toUpperCase() + '\x1b[0m';
  } else {
    return method.toUpperCase();
  }
}
