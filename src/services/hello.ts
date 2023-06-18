import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { v4 as uuid } from 'uuid'

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      `hello world ${uuid()} with table ${process.env.TABLE_NAME}`
    ),
  }

  return response
}

export { handler }
