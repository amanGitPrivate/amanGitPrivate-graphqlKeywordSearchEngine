const { ApolloServer, gql } = require("apollo-server");
const { MvrpAPI } = require("./datasource");

// query defination
const typeDefs = gql`
  type Word {
    word: String, 
    score: Int,
    tags: [String!],
    filter: Int,
    order: String,
  }
  type Query {
    keywords(match: String!, filter: Int, order: String): [Word]
  }
`;

// resolver to work on query
const resolvers = {
  Query: {
    keywords: (root, { match, filter, order }, { dataSources }) => {
      const someval = dataSources.mvrpAPI.getACar(match).then(function(result) {
        const resultFiltered = result.slice(0, filter);
        resultFiltered.sort((a, b) => order !== 'DES' ? b.score - a.score : a.score - b.score);
        return resultFiltered;  
      });
      return someval;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
