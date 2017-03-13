export default function ({models}) {
  const {User} = models;

  return {
    /**
     * create a new user
     * @param email
     * @returns user
     */
    async createUser({email}) {
      const duplicateUser = await User.findOne({email}, {_id: 1});

      if (duplicateUser) throw new Error('duplicate user');

      const newUser = await User.create({email});

      return newUser.toObject();
    },
  };
}
