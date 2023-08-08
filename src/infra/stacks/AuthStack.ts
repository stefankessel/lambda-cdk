import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

export class AuthStack extends Stack {
  public userPool!: UserPool
  private userPoolClient!: UserPoolClient
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.createUserPool()
    this.createUserPoolClient()
  }

  private createUserPool = () => {
    this.userPool = new UserPool(this, 'FinderUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { username: true, email: true },
    })

    new CfnOutput(this, 'FinderUserPoolId', {
      value: this.userPool.userPoolId,
    })
  }

  private createUserPoolClient = () => {
    this.userPoolClient = this.userPool.addClient('FinderUserPoolClient', {
      authFlows: {
        adminUserPassword: true,

        custom: true,
        userPassword: true,
        userSrp: true,
      },
    })

    new CfnOutput(this, 'FinderUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    })
  }
}
