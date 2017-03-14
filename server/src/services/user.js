import ServiceError from './lib/service_error';

export default function ({models}) {
  const {User} = models;

  return {
    /**
     * create a new user
     * @param email
     *
     * @returns user
     *
     * @error {name: 'ServiceError', code: 'duplicate-user'}
     */
    async createUser(email) {
      const duplicateUser = await User.findOne({email}, {_id: 1});

      if (duplicateUser) throw new ServiceError('duplicate-user');

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
     *
     * @error {name: 'ServiceError', code: 'no-user'}
     */
    checkUserExists(user) {
      if (!user) {
        throw new ServiceError('no-user');
      }
    }
  };
}
