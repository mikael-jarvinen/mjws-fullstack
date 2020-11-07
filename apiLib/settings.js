let SECRET = process.env.JWT_DEV
if (process.env.NODE_ENV === 'production') {
  SECRET = process.env.JWT
}

export const JWT_SECRET = SECRET