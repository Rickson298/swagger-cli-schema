declare module 'swagger-client' {
  export type RequestParameters = {
    name: string;
    in: 'query' | 'path';
    required: boolean;
    schema: {
      type: 'string' | 'integer' | 'boolean' | 'object' | 'array';
    };
  };

  export type RequestBody = {
    content: {
      'application/json': {
        schema: {
          required: string[];
          type: 'object';
          properties: Record<string, unknown>;
        };
      };
    };
  };

  export type RequestSuccessType = {
    content: {
      'application/json': {
        schema: {
          type: 'object';
          description: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          properties: Record<string, any>;
        };
      };
    };
  };

  export type RequestGet = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    responses: {
      200: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestPut = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody: RequestBody;
    responses: {
      200: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestPost = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody: RequestBody;
    responses: {
      200: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestDelete = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    responses: {
      200: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestPatch = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody: RequestBody;
    responses: {
      200: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type SwaggerPath = {
    put?: RequestPut;
    get?: RequestGet;
    post?: RequestPost;
    delete?: RequestDelete;
  };

  export type SwaggerPaths = Record<string, SwaggerPath>;

  export type SwaggerClientTypes = {
    url: string;
    originalSpec?: unknown;
    spec: {
      openapi: string;
      info: {
        title: string;
        description: string;
        termsOfService: string;
        license: { name: string; url: string };
        version: string;
      };

      paths: SwaggerPaths;
    };
    errors: [];
    apis: {
      [keyof: string]: Promise<unknown>;
    };
  };

  export default function SwaggerClient(options: {
    url: string;
  }): Promise<SwaggerClientTypes>;
}
