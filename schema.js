import { makeExecutableSchema } from 'apollo-server';
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries|mutations}.js`,
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeTypeDefs(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
