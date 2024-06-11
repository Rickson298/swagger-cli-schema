export function kebabCaseToPascalCase(kebabCase: string): string {
  return kebabCase
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
