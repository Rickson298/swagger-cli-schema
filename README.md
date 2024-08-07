## Introduction

Swagger CLI Schema is a powerful tool designed to simplify and enhance your API development experience. It seamlessly bridges the gap between your Swagger definitions and code generation, enabling you to generate well-defined request and response types directly from the command line. This automation translates to significant time savings and improved code quality.

## Benefits:

Effortless Type Generation: Say goodbye to manual coding of request and response types. Swagger CLI Schema automatically generates them based on your Swagger definitions, ensuring consistency and accuracy.
Enhanced Developer Experience: Focus on the core logic of your API. Swagger CLI Schema takes care of the repetitive task of type generation, allowing you to concentrate on building a robust and efficient API.
Improved Code Quality: By eliminating manual type creation, you reduce the risk of errors and inconsistencies that can plague hand-written code.
Streamlined Workflow: Integrate Swagger CLI Schema into your development process for a smooth transition from defining API specifications to generating production-ready types.

## Getting Started

Using Swagger CLI Schema is straightforward. Here's a quick guide:

### 1 - Installation:

- Install Swagger CLI Schema using your preferred package manager. Example:

```bash
yarn add -D swagger-cli-schema
```

Or

```bash
npm install --save-dev swagger-cli-schema
```

### 2 - Execute the `connectToSwagger` function

Example:

```ts
import { connectToSwagger } from 'swagger-cli-schema';

connectToSwagger({
  swaggerURLs: ['https://my-swagger-doc.com.br/apis/docs/swagger.json'],
}).then(
  ({
    requestTypes,
    responseTypes,
    selectedApiMethod,
    selectedPath,
    serviceName,
  }) => {
    console.log({
      requestTypes,
      responseTypes,
      selectedApiMethod,
      selectedPath,
      serviceName,
    });
  }
);
```

The `swagger-cli-schema` package provides a single function: connectToSwagger. You can execute this function at any point in your script. It is responsible for retrieving the information of the selected service.

### Caveats

- `connectToSwagger` must be executed in a CLI environment. For example:

```bash
yarn tsx src/scripts/my-service-type-generator/index   // <--- `connectToSwagger` is being executed here
```

- You might encounter issues when using `ts-node` or similar tools. Therefore, it's recommended to use `tsx` to execute the script without problems.
