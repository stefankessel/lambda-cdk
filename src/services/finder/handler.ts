import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { postHandler } from './postHandler'
import { getHandler } from './getHandler'

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

const ddbClient = new DynamoDBClient({})

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod

  try {
    switch (method) {
      case HttpMethods.GET: {
        return getHandler(event, ddbClient)
      }
      case HttpMethods.POST: {
        return postHandler(event, ddbClient)
      }
      default: {
        return postHandler(event, ddbClient)
      }
    }
  } catch (error: any) {
    let response: APIGatewayProxyResult = {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
    return response
  }
}
