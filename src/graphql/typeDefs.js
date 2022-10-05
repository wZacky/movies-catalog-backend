export const typeDefs = `
  type Query {
    greeting: String
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
`