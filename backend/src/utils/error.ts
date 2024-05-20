import { NextFunction, Request, Response } from "express";

 interface ErrorHandlerTypes extends Error{
   status : number
 }
 export const errors = (err : ErrorHandlerTypes , req : Request, res : Response, next : NextFunction)=>{
  const message = err.message
  console.log(err.status)
  res.status(err.status || 500).json({
    sucess: false,
    message : message
  })
}