import jwt, { SignOptions } from 'jsonwebtoken'
import  config  from 'config'

export const signJwt = (
    payload: Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options: SignOptions
) => {
    const privateKey = Buffer.from(
        config.get<string>(keyName),
        'base64'
      ).toString('ascii');
    return jwt.sign(payload , privateKey , {
        ...(options && options),
        algorithm : 'RS256'
    })
}

export const verifyJwt = <T>(token : string , 
    keyName: 'accessTokenPrivateKey' | 'accessTokenPublicKey' | 'refreshTokenPublicKey'
    ) : T | null => {
    try {
        const publicKey = Buffer.from(
            config.get<string>(keyName),
            'base64'
          ).toString('ascii');
        const decode = jwt.verify(token , publicKey) as T
        
        return decode
    } catch (error) {
        return null
    }
}