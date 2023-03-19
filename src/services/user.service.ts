import { AppDataSource } from "../utils/data-source";
import {CreateUserInputType , LoginUserInputType} from '../schemas/user.schema'
import { User } from "../entities/user.entity";
import config from 'config'
import redisClient from "../utils/connectRedis";
import { signJwt } from "../utils/jwts";
import AppError from "../utils/appError";

const userRepo = AppDataSource.getRepository(User)


// get the tokens
export const signTokens = (user : User) => {
    redisClient.set(user.id , JSON.stringify(user) , {
        EX : config.get<number>('redisCacheExpiresIn') * 60
    })

    const access_token = signJwt({sub : user.id} , 'accessTokenPrivateKey', {
        expiresIn : `${config.get<number>('accessTokenExpiresIn')}m`
    })
    const refresh_token = signJwt({sub : user.id} , 'refreshTokenPrivateKey' , {
        expiresIn : `${config.get<number>('refreshTokenExpiresIn')}m`
    })
    return {access_token , refresh_token}
}

export const createUser = async (input : CreateUserInputType) => {
    return await userRepo.save(userRepo.create(input))
}

export const findUserByEmail = async ({email} : {email : string}) => {
    return await userRepo.findOneBy({email})
}
  
export const findUserById = async (id : string) => {
    const user = await userRepo.findOneBy({id})
    if(user) return user
    throw new AppError(400 , 'user not found')
}

export const searchUserByName = async (searchText : string) => {
    return await userRepo.createQueryBuilder('user')
    .where('to_tsvector(user.name) @@ to_tsquery(:searchText)' , {searchText})
    .getMany() 
}
