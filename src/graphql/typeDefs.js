export const typeDefs = `
  type Query {
    greeting: String
    login(email: String!, password: String!): String
  }

  type Movie {
    title: String!
    image: String!
    description: String!
    registeredBy: String!
    likes: Int
  }

  type User {
    email: String!
    password: String!
  }

  type Mutation {
    addMovie(
      title: String!
      image: String!
      description: String!
      registeredBy: String!
      likes: Int
    ): Movie
  }

  type Mutation {
    registerUser(
      email: String!
      password: String!
    ): User
  }

  type Mutation {
    updateLikes(
      movieId: String!
      likes: Int!
    ): Int
  }

  type Mutation {
    deleteMovie(
      movieId: String!
    ): ID
  }
`