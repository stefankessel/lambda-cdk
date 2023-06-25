import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { postHandler } from './postHandler'
import { getHandler } from './getHandler'
import { updateHandler } from './updateHandler'
import { deleteHandler } from './deleteHandler'

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
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
      case HttpMethods.PUT: {
        return updateHandler(event, ddbClient)
      }
      case HttpMethods.DELETE: {
        return deleteHandler(event, ddbClient)
      }
      default: {
        return {
          statusCode: 500,
          body: JSON.stringify('something went wrong'),
        }
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
