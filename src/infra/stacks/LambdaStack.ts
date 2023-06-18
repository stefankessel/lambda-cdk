import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    new LambdaFunction(this, 'Hello', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
      handler: 'hello.main',
    })
  }
}
