import {getUserData} from '../../lib/jwt';

// interfaces
import {
IUser,
ICreateUserInput,
IModels,
ILoginInput,
IAuthPayload
} from '../../types';

import{doLogin, getUserBy} from '../../lib/auth';
export default {
    Query:{
        getUsers:(
            _:any,
            args:any,
            ctx:{models:IModels}
        ):IUser[]=>ctx.models.User.findAll(),
        getUserData:async (
            _:any,
            {at}:{at:string},
            {models}:{models:IModels}
        ):Promise<any>=>{
            try {
                const connectedUser = await(getUserData(at));
                if(connectedUser){
                    //validate the user
                    const user = await getUserBy({
                        id:connectedUser.id,
                        privilege:connectedUser.privilege,
                        active:connectedUser.active
                    },models)
                    if (user) return connectedUser;
                }
                return {
                    id:'',
                    username:'',
                    password:'',
                    email:'',
                    privilege:'',
                    active:false
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation:{
        createUser:(
            _:any,
            {input}:{input:ICreateUserInput},
            {models}:{models:IModels}
        ):IUser=>models.User.create({...input}),
        login:(
            _:any,
            {input}:{input:ILoginInput},
            {models}:{models:IModels}
        ):Promise<IAuthPayload>=>{
            try {
                return doLogin(input.email,input.password,models);
            } catch (error) {
                return error;
            }
        }
    }
}