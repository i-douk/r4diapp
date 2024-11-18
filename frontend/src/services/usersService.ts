// services/UserService.js
import type { LoginForm } from '@/types/AuthForm'
import { expressClient } from './expressClient'

export default {
  getUsers() {
    return expressClient.get(`/users`)
  },
  userslogin(formData: LoginForm) {
    const returnedToken = expressClient.post('/userlogin', formData)
    return expressClient.post('/userlogin', formData)
  }
}
