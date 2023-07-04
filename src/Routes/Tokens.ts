import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const email_token_expiration_in_min=10;
const AUTH_EXP_TOKEN=10;

const JWT_SECRET="secret";

const route =Router()
const prisma =new PrismaClient()

//token generate a random 8 digit number as the email token
function generateEmailToken():string{
    return Math.floor(Math.random()*90000000).toString();
}
//say expire in 10 min


function generateAuthToken(tokenId:number):string{
    const jwtpayload={tokenId};
    // return jwt.sign(jwtPayload,JWT_SECRET,{
    //     algorithm:"HS256",
    //     noTimeStamp:true
    // })
    return jwt.sign(jwtpayload,JWT_SECRET,{
        algorithm:'HS256',
        noTimestamp:true
    })



}

//CREATE A User if it doesn't exist
//generate the emailToken aand sent it to their email
//we will create a pass so it is post
route.post('/login',async(req,res)=>{
    const {email}=req.body; //here you made mistake
    const emailToken=generateEmailToken();
    const expiration =new Date(
        new Date().getTime()+ email_token_expiration_in_min * 60000
    )
    try{
    const createdToken=await prisma.token.create({
        data:{
            type:"EMAIL",
            emailToken:emailToken,
            expirationTime:expiration,
            users:{
                connectOrCreate:{
                    where:{
                        email
                    },
                    create:{email}
                }

            }
        }})
        console.log(createdToken)
        res.sendStatus(200)
    }
    catch(e){
        console.log(e)
        res.status(400).json({error:"couldn't start the authentication"})
    }
}

    )
//validate the emailToken
//generate a long-lived jwt token
//here we are checking the emailToken
route.post('/auth',async(req,res)=>{
    const {email,emailToken}=req.body;
    console.log(email,emailToken)
    const dbEmailToken=await prisma.token.findUnique({
        where:{
            emailToken,
        },
        include:{
            users:true
        }
    })
    
    console.log(dbEmailToken)
    if(!dbEmailToken || !dbEmailToken.valid){
        return res.sendStatus(401).json({error:"boring"})
    }
    if(dbEmailToken.expirationTime <new Date()){
        return res.status(401).json({error:'it is expired bro'})
    }
    

    if(dbEmailToken?.users?.email !== email){
        return res.sendStatus(401).json({error:"go and check the email dude"})
    }
    //but if i give this there will be cyberattack because the token is ri8

    //here we validate that the user is the owner of the email
    const expiration_auth =new Date(
        new Date().getTime()+ AUTH_EXP_TOKEN * 6000000
    )
    const apiToken=await prisma.token.create({
        data:{
        type:'Api',
        expirationTime:expiration_auth,
        users:{
            connect:{
                email,
            }
        }
        
        }
    })
    
    //making the code as invalid bettr to say making it as one time use
    
        await prisma.token.update({
                where:{id:dbEmailToken.id},
                data:{
                    valid:false
                  
                },
                
            
            }
           )
    

    //generate JWT token
    //the backend only know decode it for that we use jwt
    const  authToken=generateAuthToken(apiToken.id)
    res.json({authToken});

})
export default route;
