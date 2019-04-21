import { AUTH_TOKEN } from '../utils/constants'

class Auth {
  token = localStorage.getItem(AUTH_TOKEN)
  isAuthorized = Boolean(this.token)

  authorize(token) {
    localStorage.setItem(AUTH_TOKEN, token)
    this.token = token
    this.isAuthorized = true
  }

  clear() {
    localStorage.removeItem(AUTH_TOKEN)
    this.token = null
    this.isAuthorized = false
  }
}

export default new Auth()
