export function isValidKey(key: string) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}
