import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod
  let message: string = ''

  switch (method) {
    case HttpMethods.GET: {
      message = 'hello GET'
      break
    }
    case HttpMethods.POST: {
      message = 'hello from POST'
      break
    }
    default: {
      break
    }
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  }

  return response
}
