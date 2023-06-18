import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

interface LambdaStackProbs extends StackProps {
  table: ITable
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegation: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProbs) {
    super(scope, id, props)

    const helloLambda = new NodejsFunction(this, 'Hello', {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '..', '..', 'services', 'hello.ts'),
      handler: 'handler',
      environment: {
        TABLE_NAME: props.table.tableName,
      },
    })

    this.helloLambdaIntegation = new LambdaIntegration(helloLambda)
  }
}
