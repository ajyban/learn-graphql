import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date

    type SkiDay {
        id: ID!
        date: Date!
        mountain: String!
        conditions: Conditions
    }

    enum Conditions{
        POWDER
        HEAVY
        ICE
        THIN
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        date: String!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
    addDay(input: AddDayInput!): SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

// const resolvers = {

// };

const mocks = {
    Date: () => "1/2/2025"
}
const server = new ApolloServer({
    typeDefs,
    mocks
});

server.listen().then(({url})=>console.log(`Server running at ${url}`));