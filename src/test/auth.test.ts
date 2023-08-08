import { AuthService } from './AuthService'

async function testAuth() {
  const authService = new AuthService()
  const user = await authService.login('safu', 'xT7pY:bk%gS34=2')

  console.log(user.getSignInUserSession()?.getIdToken().getJwtToken())
}

testAuth()
