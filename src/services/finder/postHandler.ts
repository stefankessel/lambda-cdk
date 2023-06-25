import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { validateApiBodyInput } from '../../utils/validateApiBodyInput'
import { marshall } from '@aws-sdk/util-dynamodb'
import { Finder } from '../../models/Finder'

export const postHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  const item: Finder = JSON.parse(event.body!)
  item.id = uuid()
  validateApiBodyInput(item)

  const result = await client.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item),
    })
  )

  return {
    statusCode: 201,
    body: JSON.stringify({ result }),
  }
}
