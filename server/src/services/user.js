import ServiceError from './lib/service_error';

export default function ({models}) {
  const {User} = models;

  return {
    /**
     * create a new user
     * @param email
     * @returns user
     */
    async createUser(email) {
      const newUser = await User.create({email});
      return newUser.toObject();
    },

    async findUser(userId) {
      return await User.findOne({_id: userId});
    },

    async findUserByEmail(email) {
      return await User.findOne({email});
    },

    /**
     * check if the user exists
     * @param user
     * @error {name: 'ServiceError', code: 'user-not-exists'}
     */
    checkUserExists(user) {
      if (!user) {
        throw new ServiceError('user-not-exists');
      }
    },

    /**
     * check if the user does not exist
     * @param user
     * @error {name: 'ServiceError', code: 'user-already-exists'}
     */
    checkUserNotExists(user) {
      if (user) {
        throw new ServiceError('user-already-exists')
      }
    }
  };
}
