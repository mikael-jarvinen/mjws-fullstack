import { getUser } from './auth'

const context = async ({ req }) => {
  const token = req.headers.authorization || ''
  let user = ''
  try {
    user = await getUser(token)
    return { user }
  } catch (e) {
    return { user }
  }
}

export default context