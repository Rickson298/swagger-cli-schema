declare module 'swagger-client' {
  export type PrimitivePropertyType =
    | 'string'
    | 'integer'
    | 'boolean'
    | 'object'
    | 'array';

  export type RequestParameters = {
    name: string;
    in: 'query' | 'path';
    required: boolean;
    schema: {
      type?: PrimitivePropertyType;
      items?: {
        type: PrimitivePropertyType;
      };
    };
  };

  type PrimitivePropertyType = {
    type?: 'string' | 'boolean' | 'integer' | 'null';
  };

  type ArrayPropertyType = {
    required: string[];
    type?: 'array';
    items?: ApiSchema;
  };

  export type ApiSchema =
    | ObjectPropertyType
    | PrimitivePropertyType
    | ArrayPropertyType;

  export type ObjectPropertyType = {
    required: string[];
    type?: 'object';
    properties?: Record<string, ApiSchema>;
    description?: string;
  };

  export type RequestBody = {
    content?: {
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
    content?: {
      'application/json': {
        schema: ObjectPropertyType;
      };
    };
  };

  export type RequestGet = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody?: RequestBody;
    responses: {
      [status: number]: RequestSuccessType | undefined;
    };
    __originalOperationId: string;
  };

  export type RequestPut = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters?: RequestParameters[];
    requestBody?: RequestBody;
    responses: {
      [status: number]: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestPost = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody?: RequestBody;
    responses: {
      [status: number]: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestDelete = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody?: RequestBody;
    responses: {
      [status: number]: RequestSuccessType;
    };
    __originalOperationId: string;
  };

  export type RequestPatch = {
    tags: string[];
    summary: string;
    operationId: string;
    parameters: RequestParameters[];
    requestBody?: RequestBody;
    responses: {
      [status: number]: RequestSuccessType;
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
