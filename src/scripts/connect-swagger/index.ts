/* eslint-disable no-console */
import SwaggerClient from 'swagger-client';
import { getColorizedPaths } from './utils/get-colorized-paths';
import { getApiMethods } from './utils/get-path-methods';
import { ServiceInquirer } from './utils/service-inquirer';
import type { ResponseProperty } from './utils/format-swagger-response';
import { formatResponse } from './utils/format-swagger-response';
import util from 'util';

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
    selectedApiMethod = await serviceInquirer.promptPathMethod(apiMethods);
  }

  const parsedPath = selectedPath.split(' ').at(-1) || '';

  const pathMethods = clientSwagger?.spec?.paths?.[parsedPath];
  // console.log({
  //   pathMethods,
  //   selectedPath,
  //   selectedApiMethod,
  //   paths: clientSwagger?.spec.paths,
  //   parsedPath,
  // }); // Output: ['GET', 'POST']

  // const response = swaggerPathFormatter(pathMethods as SwaggerPath, 'post');
  // console.log(util.inspect(pathMethods, false, null, true));
  // console.log(util.inspect(pathMethods, false, null, true));

  // console.log(util.inspect(pathMethods, false, null, true));

  // console.log(util.inspect(pathMethods?.post, false, null, true));
  console.log(
    util.inspect(
      formatResponse(
        pathMethods?.post?.responses[200].content['application/json']
          .schema as ResponseProperty,
      ),
      false,
      null,
      true,
    ),
  );

  // await serviceInquirer.promptForServiceName();
  // await serviceInquirer.promptServiceMethod();

  // createServiceFolder(serviceInquirer.serviceName);
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
