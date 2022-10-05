import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const resolvers = {
  Query: {
    greeting: () => 'Hello from graphql Yoga',
    login: async (_, {email, password}) => {
      const userId = await User.findOne({$and: [{email: email}, {password: password}]}, 'id');

      if (!userId) {
        return 'ID-E01'
      }

      // console.log(userId);
      return userId._id;
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      // const {title, image, description, likes, registeredBy} = args;
      const movie = await Movie.create(args);
      return movie;
    },
    registerUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    }
  }
};