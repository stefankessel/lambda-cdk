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
import { MissingInputError } from '../../utils/validateApiBodyInput'

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
  let response: APIGatewayProxyResult
  try {
    switch (method) {
      case HttpMethods.GET: {
        response = await getHandler(event, ddbClient)
        break
      }
      case HttpMethods.POST: {
        response = await postHandler(event, ddbClient)
        break
      }
      case HttpMethods.PUT: {
        response = await updateHandler(event, ddbClient)
        break
      }
      case HttpMethods.DELETE: {
        response = await deleteHandler(event, ddbClient)
        break
      }
      default: {
        response = {
          statusCode: 500,
          body: JSON.stringify('something went wrong'),
        }
      }
    }

    return response
  } catch (error: any) {
    if (error instanceof MissingInputError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify(error.message + ' error message'),
    }
  }
}
