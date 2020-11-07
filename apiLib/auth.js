import users from '../users.json'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './settings'
import { AuthenticationError } from 'apollo-server-micro'

export const login = async (username, password) => {
  for (const user of users) {
    if (user.username === username) {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return jwt.sign(user.id, JWT_SECRET)
      }
    }
  }
  throw new AuthenticationError('Wrong password or username')
}

export const getUser = async (token) => {
  const user = jwt.verify(token, JWT_SECRET, (err, decodedId) => {
    if (!err) {
      return users.find(u => u.id === decodedId)
    } else {
      return {
        username: '',
        id: ''
      }
    }
  })

  return {
    username: user.username,
    id: user.id
  }
}