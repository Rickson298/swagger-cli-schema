// Libs
import inquirer from 'inquirer';

// Types
import type { APIMethods } from './types';

export class ServiceInquirer {
  serviceName: string;
  serviceMethod: string;

  constructor() {
    this.serviceName = '';
    this.serviceMethod = '';
  }

  async promptForServiceName() {
    const serviceNameResponse = await inquirer.prompt({
      type: 'input',
      name: 'service-name',
      message: 'Em kebab-case, insira o nome do serviço: ',
      validate: (value) => (value ? true : 'Não é permitido um nome vazio'),
    });

    this.serviceName = serviceNameResponse['service-name'];
  }

  async promptServiceMethod() {
    const defaultServiceType = this.serviceName.split('-')[0].toUpperCase();

    const serviceMethodResponse = await inquirer.prompt({
      type: 'list',
      name: 'service-type',
      message: 'Qual o tipo do serviço?',
      choices: ['GET', 'POST', 'PUT', 'DELETE'],
      default: defaultServiceType,
    });

    this.serviceMethod = serviceMethodResponse['service-type'];
  }

  async promptSwaggerDocs(swaggerDocs: string[]) {
    const serviceMethodResponse = await inquirer.prompt({
      type: 'list',
      name: 'swagger-doc',
      message: 'Escolha a documentação do Swagger:',
      choices: swaggerDocs,
    });

    return serviceMethodResponse['swagger-doc'];
  }

  async promptServicePaths(routes: string[]): Promise<string> {
    const serviceMethodResponse = await inquirer.prompt({
      type: 'list',
      name: 'paths-api',
      message: 'Escolha a rota do API:',
      choices: routes,
    });

    return serviceMethodResponse['paths-api'];
  }

  async promptPathMethod(methods: string[]): Promise<APIMethods> {
    const serviceMethodResponse = await inquirer.prompt({
      type: 'list',
      name: 'path-methods',
      message: 'Escolha o método da API:',
      choices: methods,
    });

    const selectedMethod: string = serviceMethodResponse['path-methods'];

    return selectedMethod.toLowerCase() as APIMethods;
  }
}
