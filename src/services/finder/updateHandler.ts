import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const updateHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  if (
    event.queryStringParameters &&
    'id' in event.queryStringParameters &&
    event.body
  ) {
    const queryId = event.queryStringParameters['id']!
    const body = JSON.parse(event.body)
    const key = Object.keys(body)[0]
    const value = Object.values(body)[0] as string

    const res = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: queryId } },
        ConditionExpression: 'attribute_exists(id)',
        UpdateExpression: `set #key= :value`,
        ExpressionAttributeNames: { '#key': key },
        ExpressionAttributeValues: { ':value': { S: value } },
      })
    )

    return {
      statusCode: 204,
      body: JSON.stringify(`updated item with id ${queryId}`),
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify('provide right args for update operation'),
    }
  }
}
