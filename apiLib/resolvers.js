import { login as Login } from './auth'
import { AuthenticationError } from 'apollo-server-micro'
import { getContent, newContent } from './contentService'
import { receiveEmail, sendEmailReceived } from './emailService'

const resolvers = {
  Query: {
    ping: () => 'pong',
    login: async (root, args) => 
      await Login(args.username, args.password),
    whoami: (root, args, context) => context.user,
    content: () => getContent().content
  },
  Mutation: {
    newContent: (root, args, context) => {
      if (context.user.id) {
        return newContent(args.content)
      } else {
        throw new AuthenticationError('you must be logged in')
      }
    },
    contact: async (root, { email, name, message }) => {
      await receiveEmail(email, name, message)
      await sendEmailReceived(email)
      return 'success'
    }
  }
}

export default resolvers