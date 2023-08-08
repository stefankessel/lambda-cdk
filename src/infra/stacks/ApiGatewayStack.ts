import { Stack, StackProps } from 'aws-cdk-lib'
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

interface ApiGatewayProps extends StackProps {
  lambdaIntegration: LambdaIntegration
  userPool: IUserPool
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id, props)

    const api = new RestApi(this, 'FinderApi')

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      'finderApiAuthorizer',
      {
        cognitoUserPools: [props.userPool],
        identitySource: 'method.request.header.Authorizer',
      }
    )
    // attach authorizer to api
    authorizer._attachToApi(api)

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    }

    const apiResource = api.root.addResource('finder')

    apiResource.addMethod('GET', props.lambdaIntegration, optionsWithAuth)
    apiResource.addMethod('POST', props.lambdaIntegration, optionsWithAuth)
    apiResource.addMethod('PUT', props.lambdaIntegration, optionsWithAuth)
    apiResource.addMethod('DELETE', props.lambdaIntegration, optionsWithAuth)
  }
}
