// Libs
import SwaggerClient from 'swagger-client';
import type { ApiSchema, ObjectPropertyType } from 'swagger-client';

// Utils
import { formatSwaggerSchema } from './utils/format-swagger-schema';
import { getColorizedPaths } from './utils/get-colorized-paths';
import { getApiMethods } from './utils/get-path-methods';
import { parseURLParams } from './utils/parse-query-params';
import { kebabCaseToPascalCase } from '../shared/utils/kekab-case-to-pascal-case';
import { generateTypesBySchema } from './utils/generate-types-by-schema';
import { formatCode } from '../shared/utils/format-code';

// Classes
import { ServiceInquirer } from './utils/service-inquirer';

console.log('Creating service...');

type ConnectToSwaggerParams = {
  swaggerURLs: string[];
};

export async function connectToSwagger({
  swaggerURLs,
}: ConnectToSwaggerParams) {
  const serviceInquirer = new ServiceInquirer();

  const swaggerDoc = await serviceInquirer.promptSwaggerDocs(swaggerURLs);

  const clientSwagger = await getSwaggerDocData(swaggerDoc);

  const paths = getColorizedPaths(clientSwagger?.spec.paths || {});

  const selectedPath = await serviceInquirer.promptServicePaths(paths);

  const apiMethods = getApiMethods(selectedPath);
  const apiHasMultipleMethods = apiMethods.length > 1;

  let selectedApiMethod = apiMethods[0];

  if (apiHasMultipleMethods) {
    selectedApiMethod = await serviceInquirer.promptPathMethod(
      apiMethods.map((method) => method.toUpperCase()),
    );
  }

  const parsedPath = selectedPath.split(' ').at(-1) || '';

  const pathMethods = clientSwagger?.spec?.paths?.[parsedPath];
  const requestSchema = pathMethods[selectedApiMethod];

  const successResponse: Record<number, ObjectPropertyType> = {
    200: requestSchema?.responses[200]?.content['application/json'].schema,
    202: requestSchema?.responses[202]?.content['application/json'].schema,
  };

  const requestBody = formatSwaggerSchema(
    requestSchema.requestBody?.content?.['application/json']
      ?.schema as ApiSchema,
    requestSchema.requestBody?.content?.['application/json']?.schema.required,
  );

  const queryParams = parseURLParams(requestSchema.parameters);

  const serviceName = kebabCaseToPascalCase(
    requestSchema.__originalOperationId,
  );

  const parsedResponse = formatSwaggerSchema(
    successResponse[200] || successResponse[202],
    [],
  );

  const responseTypes = generateTypesBySchema(
    parsedResponse,
    serviceName + 'Response',
  );
  const requestTypes = generateTypesBySchema(
    { ...requestBody, ...queryParams },
    serviceName + 'Request',
  );

  const indentedResponseTypes = await formatCode(responseTypes);
  const indentedRequestTypes = await formatCode(requestTypes);

  const indentedTypes = await formatCode(
    indentedRequestTypes.concat(indentedResponseTypes),
  );

  return {
    types: indentedTypes,
    serviceName,
    selectedApiMethod,
    selectedPath: parsedPath,
  };
}

async function getSwaggerDocData(swaggerUrl: string) {
  try {
    console.log('Conectando ao swagger...');
    const client = await SwaggerClient({ url: swaggerUrl });

    return client;
  } catch (error) {
    console.error('Error getting data from route:', error);
  }
}
