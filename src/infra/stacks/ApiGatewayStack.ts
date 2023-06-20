import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

interface ApiGatewayProps extends StackProps {
  lambdaIntegration: LambdaIntegration
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id, props)

    const api = new RestApi(this, 'FinderApi')
    const apiResource = api.root.addResource('finder')
    apiResource.addMethod('GET', props.lambdaIntegration)
    apiResource.addMethod('POST', props.lambdaIntegration)
  }
}
