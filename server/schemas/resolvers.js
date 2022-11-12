const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, { user }) => {
            if (user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true })

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');

        },
        removeBook: async (parent, bookId, { user }) => {
            if (user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: args.bookId } },
                )

                return updateUser
            }

            throw new AuthenticationError('You need to be logged in!');

        }

    },
};

module.exports = resolvers;
