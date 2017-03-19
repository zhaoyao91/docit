export default `
type Query {
  findUserById(
    id: ID!
  ): User
}

type Mutation {
  createUser (
    email: String!
    password: String!
  ): User
}

schema {
  query: Query
  mutation: Mutation
}

type User {
  id: ID!
  email: String
  createdAt: Date
  updatedAt: Date
}

scalar ID
scalar Date
`