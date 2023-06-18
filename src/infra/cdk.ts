import { App } from 'aws-cdk-lib'
import { DataStack } from './stacks/DataStack'
import { LambdaStack } from './stacks/LambdaStack'
import { ApiGatewayStack } from './stacks/ApiGatewayStack'

const app = new App()
const dataStack = new DataStack(app, 'DataStack')
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  table: dataStack.finderTable,
})
new ApiGatewayStack(app, 'ApiGatewayStack', {
  lambdaIntegration: lambdaStack.helloLambdaIntegation,
})
