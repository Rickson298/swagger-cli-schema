export function sanitizePath(route: string) {
  const indexOfSlash = route.indexOf('/');

  return route.substring(indexOfSlash);
}
