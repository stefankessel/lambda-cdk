import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { unmarshall } from '@aws-sdk/util-dynamodb'

export const getHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters) {
    return await getByIdHandler(event, client)
  } else {
    const result = await client.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
      })
    )

    const unmarshalledResult = result.Items?.map((item) => unmarshall(item))
    return {
      statusCode: 201,
      body: JSON.stringify(unmarshalledResult),
    }
  }
}

const getByIdHandler = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  if ('id' in event.queryStringParameters!) {
    const queryId = event.queryStringParameters['id']!

    const result = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: queryId },
        },
      })
    )

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify(`id ${queryId} not found`),
      }
    }
    const unmarshalledResult = unmarshall(result.Item)

    return {
      statusCode: 200,
      body: JSON.stringify(JSON.stringify(unmarshalledResult)),
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify('no id as query parameter provided'),
    }
  }
}
