import { CognitoUser } from '@aws-amplify/auth'
import { Amplify, Auth } from 'aws-amplify'

const awsRegion = 'eu-central-1'

Amplify.configure({
  Auth: {
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    region: awsRegion,
    userPoolId: 'eu-central-1_DRbYMZAqe',
    userPoolWebClientId: '4i21seee00nbou6g4m7q808voi',
  },
})
export class AuthService {
  public async login(username: string, password: string) {
    const res = (await Auth.signIn(username, password)) as CognitoUser
    return res
  }
}
