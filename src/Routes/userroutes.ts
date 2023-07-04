import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router =Router();
const prisma =new PrismaClient();

//end point as root and i
//post is for creating here i am trying to create a user
router.post('/',async(req,res)=>{
    const {email,name,username}=req.body;
    try{const result=await prisma.user.create({
        data:{
            email,
            name,
            username
        }

    })
    // console.log(email,name,username)
    res.json(result)
    // res.status(501).json({error:'not implemented'})
}catch(e){
    res.status(400).json({error:"bro username or email is already taken go and change it"})
}
})

// curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"ss\", \"email\": \"ss@turbocomply.com\", \"username\": \"ss\"}" http://localhost:3000/user

//list
router.get('/',async(req,res)=>{
    const alluser=await prisma.user.findMany({
    });

    //prisma.tabel.then anything
    res.json(alluser);
    
    // res.status(501).json({error:'not implemented'})
})
//get one user like sakthi
router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    const user=await prisma.user.findUnique({where:{id:Number(id)},include:{tweets:true}}
)
    res.json(user)
    res.status(200).json({error:`not implemented: ${id}`})
})

//updated
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const {bio}=req.body;
    try{
        const result =await prisma.user.update({
            where: {id:Number(id)},
            data:{
                bio
            }


        })
        res.json(result)
    }
    catch{
    res.status(400).json({error:`failed unfortunately`})
    }
})

//curl -X PUT -H "Content-Type: application/json" -d '{"bio": "hello i am sakthi tech is interesting"}' https://localhost:3000/user/1

//delete
router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    await prisma.user.delete({where : {id:Number(id)}})
    res.sendStatus(200);
})

export default router;