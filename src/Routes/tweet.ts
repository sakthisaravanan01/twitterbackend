import {  PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken'
const router =Router();
const prisma =new PrismaClient();
const JWT_SECRET="secret";
//end point as root and i 
//post is for creating here i am trying to create a user
router.post('/',async(req,res)=>{
    // const {content,image,userId}=req.body;


    // const {content,image}=req.body;
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
            

        }}||null)
        console.log(dbToken)
        if(!dbToken?.valid || dbToken.expirationTime <new Date()){
            return res.status(400).json({error:"api token is expired"})
        }
         
     
    }
    catch(e){
        
        res.sendStatus(401)
    }

    // console.log(authHeader)
    res.sendStatus(200)
    // try{
    //     const result=await prisma.tweet.create(
    //         {
    //             data:{
    //                 content,
    //                 image,
    //                 userId

    //             }
    //         }

    //     )
    //     res.json(result)
    // }
//     catch{
//         res.status(400).json({error:'not implemented'})
//     }
//     // res.status(501).json({error:'not implemented'})
})

//list
router.get('/',async(req,res)=>{
    const data=await prisma.tweet.findMany({
       include:{user:{
        select:{
            id:true,
            name:true,
            email:true
        }
       }}
    // just a nested query thats it 
        // select:{
        //     id:true,
        //     user:{
        //         select:{
        //             id:true,
        //             name:true,
        //             username:true,

        //         },
                
        //     },
        // }
    });
    
    res.json(data)
})
//create one tweet
router.get('/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const data= await prisma.tweet.findUnique({where:{id:Number(id)},
    include:{
        user:{
            select:{
                id:true,
                email:true
            }
        }
    }})
    res.json(data)
    }
    catch(e){
        res.status(200).json({error:`not implemented`})
    }
})

//updated tweet
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const {content}=req.body;
    try{
        const data=await prisma.tweet.update({
            where :{id:Number(id)},
            data:{
                content,
            }
        })
        res.json(data)
    }
    catch(e){
        res.status(400).json({error:`not updated`})


    }

})

//delete tweet
router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    await prisma.tweet.delete({where:{id:Number(id)}})
    res.sendStatus(200)
})

export default router;