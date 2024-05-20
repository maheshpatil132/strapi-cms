import { NextFunction, Request, Response , } from "express"

export const CatchAsync = (thefun : (req : Request,res : Response,next: NextFunction)=> void)=>{
    return (req : Request,res : Response,next: NextFunction)=>{
       Promise.resolve(thefun(req, res,next)).catch((err)=>next(err))
    }
} 

