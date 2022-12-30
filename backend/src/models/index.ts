import {Sequelize} from 'sequelize';
import {$db} from '../../config';

import {IModels} from '../types';

//dbConnection
const {dialect, port, host, username,password,database} = $db;

//connecting to the database
//const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(database,username,password,{
    host,
    dialect:'postgres'
})


//models
const models:IModels = {
    User:require('./User').default(sequelize,Sequelize),
    sequelize
}
export default models;