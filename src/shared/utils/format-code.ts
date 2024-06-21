import prettier from 'prettier';

export async function formatCode(code: string) {
  const formattedCode = await prettier.format(code, {
    tabWidth: 2,
    semi: true,
    parser: 'typescript',
    singleQuote: true,
    endOfLine: 'lf',
    printWidth: 80,
  });

  return formattedCode;
}
