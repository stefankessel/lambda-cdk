import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const deleteHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters || !('id' in event.queryStringParameters)) {
    return {
      statusCode: 400,
      body: JSON.stringify('no query id provided'),
    }
  }

  const queryId = event.queryStringParameters['id']!

  const params: DeleteItemCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: {
        S: queryId,
      },
    },
    ConditionExpression: 'attribute_exists(id)',
  }

  const res = await client.send(new DeleteItemCommand(params))

  return {
    statusCode: 204,
    body: JSON.stringify(`deleted item with id ${queryId}`),
  }
}
