//configuring appolo server
import {ApolloServer} from 'apollo-server';
import models from './models';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/types';

import {$server} from '../config/index';

const apolloServer = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    context:{
        models
    }
});

// if force is true => squezlize models if change, will delet tables, includeing their names
//while force is falce and alter true,update will be done to the table fields
const alter = true;
const force = false;

models.sequelize.sync({alter,force})
.then(()=>{
    apolloServer.listen($server.port)
    .then(({url})=>{
        //eslint-disable-nex†-line no-console
        console.log(`Running on ${url}`);
    })
});