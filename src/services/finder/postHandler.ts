import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

export const postHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult

  const item = JSON.parse(event.body!)
  const primaryId = uuid()

  const result = await client.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: primaryId,
        },
        message: {
          S: item.message,
        },
      },
    })
  )

  console.log(result)

  return {
    statusCode: 201,
    body: JSON.stringify({ primaryId, result }),
  }
}
