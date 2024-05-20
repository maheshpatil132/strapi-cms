import prismaDB from "../config/db";
import { CatchAsync } from "../utils/CatchAsync";
import { ApiError } from "../utils/ErrorHandler";
import { CreateToken } from "../utils/service";

const CreateUser = CatchAsync(async(req, res,next)=>{
   const {name , email , password} = req.body

   if(!email || !name || !password){
   return next(ApiError(402, "Please fill all the details"))
   }

   const exist = await prismaDB.user.findUnique({
     where : {
        email : email
     }
   })

   if(exist){
   return next(ApiError(302, "User Already Exist"))
   }

   const User = await prismaDB.user.create({
    data:{
        name : name,
        email : email,
        password : password
    }
   })

   const token = CreateToken({ id: User.id, name: User.name });

    res.setHeader("Authorization", `Bearer ${token}`);
    
    res.cookie('token', token, {
      httpOnly:true,
      secure:true,
      sameSite:"strict"
    })

   res.status(200).json({
    message : "User Created SuccessFully",
    User,
    token
   })

})

const UpdateUser = CatchAsync(async(req, res,next)=>{
   // @ts-ignore 
   const UserId = req.user
   console.log(UserId);
    const exist = await prismaDB.user.findUnique({
      where : {
         id : UserId
      }
    })
   console.log(exist);
    
    if(!exist){
     return next(ApiError(404, "User is not found"))
    }
 
    const User = await prismaDB.user.update({
     where :{
      id : UserId
     },
     data:{
        ...req.body
     }
    })
 
    res.status(200).json({
     message : "User Updated SuccessFully",
     User
    })
 
 })


 const DeleteUser = CatchAsync(async(req, res,next)=>{
   const userId = req.params.id
    const exist = await prismaDB.user.findUnique({
      where : {
         id : Number(userId)
      }
    })
    if(!exist){
      return next(ApiError(404, "User is not found"))
    }
    const User = await prismaDB.user.delete({
     where : {
        id : Number(userId)
     }
    })
 
    res.status(200).json({
     message : "User deleted SuccessFully",
     User
    })
 
 })


 const GetAllUser = CatchAsync(async(req, res,next)=>{
    const Users = await prismaDB.user.findMany({})
    res.status(200).json({
     Users
    })
 })




export { CreateUser , UpdateUser , DeleteUser , GetAllUser}