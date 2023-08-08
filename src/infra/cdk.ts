import { App } from 'aws-cdk-lib'
import { DataStack } from './stacks/DataStack'
import { LambdaStack } from './stacks/LambdaStack'
import { ApiGatewayStack } from './stacks/ApiGatewayStack'
import { AuthStack } from './stacks/AuthStack'

const app = new App()
const dataStack = new DataStack(app, 'DataStack')
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  table: dataStack.finderTable,
})
const authStack = new AuthStack(app, 'AuthStack')
new ApiGatewayStack(app, 'ApiGatewayStack', {
  lambdaIntegration: lambdaStack.finderLambdaIntegation,
  userPool: authStack.userPool,
})
