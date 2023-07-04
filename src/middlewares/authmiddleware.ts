import { PrismaClient } from '@prisma/client';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken'
const prisma =new PrismaClient();
const JWT_SECRET="secret";
export async function authtoken(
    req:Request,
    res:Response,
    next:NextFunction

){
    //we should add authorization this will make you to implement
    //in auth in rest api
    const authHeader=req.header('authorization')

    console.log(authHeader)
    const jwtToken=authHeader?.split(' ')[1];
    console.log(jwtToken)
    //just i am interested in token because  to check with id i am
    //goinng to check with token jwt 

    // if there is no token we have to return the status
    if(!jwtToken){
        return res.sendStatus(401)
    }
    

    try {
        //decode the jwt token
        //use the save const JWT_SECRET="secret" in token 
        //because we are going to destructure it

        
        const payload =await jwt.verify(jwtToken,JWT_SECRET) as{
            tokenId:number;
        };
        console.log("payload",payload)
        //it will give a token id
        const dbToken=await prisma.token.findUnique({
            where:{
                id:payload.tokenId,
            },
            include:{
                users:true
            

        }})
        // console.log(dbToken)
        if(!dbToken?.valid || dbToken?.expirationTime < new Date()){
            return res.status(400).json({error:"api token is expired"})
        }
         
     
    }
    catch(e){
        
        res.sendStatus(401)
    }


}