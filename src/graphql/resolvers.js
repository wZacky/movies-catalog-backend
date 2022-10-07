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

      return userId._id;
    },
    userCatalog: async (_, {userId}) => {
      const user = await User.findById(userId).populate('catalog');
      console.log(userId);

      console.log(user.catalog);
      return user.catalog;
    },
    generalCatalog: async (_, args) => {
      const users = await User.find();

      console.log('AQUI');
      // console.log(users);

      const movies = []

      for (let i = 0; i < users.length; i++) {
        const newUser = await users[i].populate('catalog');
        newUser.catalog.map(movie => movies.push(movie))
      }

      const uniqueMovies = [];
      movies.forEach((movie) => {
        let result = uniqueMovies.findIndex(item => item.title === movie.title);

        if (result === -1) {
          uniqueMovies.push(movie)
        }
      })

      // console.log(uniqueMovies);
      return uniqueMovies;
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