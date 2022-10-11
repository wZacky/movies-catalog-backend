import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const resolvers = {
  Query: {
    greeting: () => 'Hello from graphql Yoga',
    login: async (_, {email, password}) => {
      try {
        const userId = await User.findOne({$and: [{email: email}, {password: password}]}, 'id');
        console.log(userId);
        return userId?._id;
      } catch (error) {
        console.log(error);
      }

      /* if (!userId) {
        return 'ID-E01'
      } */

    },
    userCatalog: async (_, {userId}) => {
      try {
        const user = await User.findById(userId).populate('catalog');
        console.log(userId);
  
        console.log(user.catalog);
        return user.catalog;
      } catch (error) {
        console.log(error);
      }
    },
    generalCatalog: async (_, args) => {
      try {
        const users = await User.find();
        // console.log('AQUI');
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
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {

      try {
        // const {title, image, description, likes, registeredBy} = args;
        console.log(args);
        const movie = await Movie.create(args);
  
        // args.registeredBy and movie._id = new ObjectId("456212sdqa15...")
        // add movie to user's catalog:
        console.log(movie);
        const user = await User.findById(args.registeredBy);
  
        const catalog = [...user.catalog, movie._id];
  
        // updated User:
        await User.findByIdAndUpdate(args.registeredBy, {catalog: catalog}, {new: true});
  
        return movie;
      } catch (error) {
        console.log(error);
      }

    },
    registerUser: async (_, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    updateLikes: async (_, {movieId, likes}) => {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, {likes: likes}, {new: true});
        return updatedMovie.likes;
      } catch (error) {
        console.log(error);
      }
    },
    deleteMovie: async (_, {movieId}) => {
      try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        console.log('deleted movie');
        console.log(deletedMovie);

        return deletedMovie._id;
      } catch (error) {
        console.log(error);
      }
    }
  }
};