import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'

interface LambdaStackProbs extends StackProps {
  table: ITable
}

export class LambdaStack extends Stack {
  public readonly finderLambdaIntegation: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProbs) {
    super(scope, id, props)

    const finderLambda = new NodejsFunction(this, 'Finder', {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '..', '..', 'services', 'finder', 'handler.ts'),
      handler: 'handler',
      environment: {
        TABLE_NAME: props.table.tableName,
      },
    })

    finderLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.table.tableArn],
        actions: ['dynamodb:PutItem'],
      })
    )

    this.finderLambdaIntegation = new LambdaIntegration(finderLambda)
  }
}
