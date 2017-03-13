export default {
  mongodbUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/docit',

  jwt: {
    secret: process.env.JWT_SECRET || 'dog on keyboard',
    validDuration: process.env.JWT_VALID_DURATION || '30 days'
  },
};