import { ARRAY_ID, REQUIRED_ID } from '../../format-swagger-schema/constants';

export function sanitizeKey(key: string) {
  return key.replace(ARRAY_ID, '').replace(REQUIRED_ID, '');
}
