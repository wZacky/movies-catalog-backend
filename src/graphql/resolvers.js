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

      // args.registeredBy and movie._id = new ObjectId("456212sdqa15...")
      // add movie to user's catalog:
      console.log(movie);
      const user = await User.findById(args.registeredBy);

      const catalog = [...user.catalog, movie._id];

      // updated User:
      await User.findByIdAndUpdate(args.registeredBy, {catalog: catalog}, {new: true});
      //console.log(updatedUser);

      return movie;
    },
    registerUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },
    updateLikes: async (_, {movieId, likes}) => {
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, {likes: likes}, {new: true});

      return updatedMovie.likes;
    },
    deleteMovie: async (_, {movieId}) => {
      const deletedMovie = await Movie.findByIdAndDelete(movieId);
      console.log(deletedMovie);

      return deletedMovie._id;
    }
  }
};