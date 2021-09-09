const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) { return await User.findOne({ _id: context.user._id }).populate('Book') };
      throw new AuthenticationError('Please login first');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) { throw new AuthenticationError('User not found') };
      const validatedTrue = await user.isCorrectPassword(password);

      if (!validatedTrue) { throw new AuthenticationError('Wrong username or password') };
      const token = signToken(user);
      return { token, user };
    },

    addBook: async (parent, { input }, context) => {
      if (context.user) {
        const bookAdd = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { addBook: input } },
          { new: true }
        );
        return bookAdd;
      }
      throw new AuthenticationError('Please login first');
    },

    removeBook: async (parent, { input }, context) => {
      if (context.user) {
        const userDelete = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { addBook: input } },
          { new: true }
        );
        return userDelete
      }
      throw new AuthenticationError('Please login first');
    },

    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      }
      catch (error) {
        console.log(error)
      }
    }
  },
};

module.exports = resolvers;
