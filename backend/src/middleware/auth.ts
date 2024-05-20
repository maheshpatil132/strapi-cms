import { NextFunction, Request, Response } from "express"
import  JWT  from "jsonwebtoken"
import { CatchAsync } from "../utils/CatchAsync"
import { ApiError } from "../utils/ErrorHandler"
import prismaDB from "../config/db"


export const Authentication= CatchAsync(async(req :Request , res :Response , next : NextFunction)=>{
  const token = req.headers.authorization

  if(!token) return next(ApiError(404, 'Please login or signup before accesing this route'))

  const authToken = token.split(' ')[1]
  const decode = JWT.verify(authToken , "mahesh")

  if(!decode) return next(ApiError(400, "User is not valid"))
 console.log(decode);
   // @ts-ignore
  const user = await prismaDB.user.findUnique({
    where : {
      // @ts-ignore
      id : decode.id
    }
  })

  if(!user) return next(ApiError(404, "Please login or signup before accesing this route"))
  // @ts-ignore
  req.user = user?.id

  next() 
})