import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const resolvers = {
  Query: {
    greeting: () => 'Hello from graphql Yoga'
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