import prismaDB from "../config/db"
import { CatchAsync } from "../utils/CatchAsync"
import { ApiError } from "../utils/ErrorHandler"


const CreateAtribute = CatchAsync(async(req,res,next)=>{
    const entityId = req.params.id

    let {attributeName, typeName} = req.body
    attributeName = attributeName.toLowerCase();
    if(!attributeName || !typeName){
        return next(ApiError(404, "atribute name and type is required"))
    }

    const entity = await prismaDB.entity.findFirst({
        where:{
            id : Number(entityId)
        }
    })

    if(!entity) return next(ApiError(404, "entity not exist"))

    const existingAttribute = await prismaDB.attributes.findFirst({
        where: {
          name: attributeName,
          entityId : Number(entityId),
        }
      });
    
      if (existingAttribute) {
        return next(ApiError(203, "attribute name should be unique"));
      }


    const NewAttribute = await prismaDB.attributes.create({
        data:{
             name : attributeName,
             entityId : Number(entityId),
             type : typeName
        }
    })
    res.status(200).json({
        sucess:true,
        message : "New entity Created Succesfully",
        NewAttribute
    })
})

const CreateManyAttribute = CatchAsync(async(req,res,next)=>{
    const entityId = req.params.id

    let {attributeName, typeName} = req.body
    attributeName = attributeName.toLowerCase();
    if(!attributeName || !typeName){
        return next(ApiError(404, "atribute name and type is required"))
    }

    const entity = await prismaDB.entity.findFirst({
        where:{
            id : Number(entityId)
        }
    })

    if(!entity) return next(ApiError(404, "entity not exist"))

    const existingAttribute = await prismaDB.attributes.findFirst({
        where: {
          name: attributeName,
          entityId : Number(entityId),
        }
      });
    
      if (existingAttribute) {
        return next(ApiError(203, "attribute name should be unique"));
      }


    const NewAttribute = await prismaDB.attributes.create({
        data:{
             name : attributeName,
             entityId : Number(entityId),
             type : typeName
        }
    })
    res.status(200).json({
        sucess:true,
        message : "New entity Created Succesfully",
        NewAttribute
    })
})

const UpdateAttribute = CatchAsync(async(req,res,next)=>{
     
    const attributeId = req.params.id
    const entityId = req.params.entity

    const exist = await prismaDB.attributes.findFirst({
        where:{
            id:Number(attributeId)
        }
    })

    if(!exist) return next(ApiError(404, "Attribute is not exits"))
    
    const existAttributeName = await prismaDB.attributes.findFirst({
        where:{
            name : (req.body.name).toLowerCase(),
            entityId : Number(entityId),
        }
    })

    if(existAttributeName) return next(ApiError(300 , "Attribute name should be unique"))
    
    const UpdatedAttribute = await prismaDB.attributes.update({
        where:{
            id : Number(attributeId),
            entityId : Number(entityId)
        },
        data:{
            name : (req.body.name).toLowerCase()
        }
    })
        
    res.status(200).json({
        sucess:true,
        message : "Attribute Updated Succesfully",
        UpdatedAttribute
    })
})

const DeleteAttribute = CatchAsync(async(req,res,next)=>{
    const attributeId = req.params.id

    const exist = await prismaDB.attributes.findFirst({
        where:{
            id:Number(attributeId)
        }
    })

    if(!exist) return next(ApiError(404, "Attribute is not exits"))

     await prismaDB.attributes.delete({
        where:{
           id : Number(attributeId)
        }
    })


    res.status(200).json({
        sucess:true,
        message : "Attribute deleted Succesfully",
    })
})

const GetAllAttributes = CatchAsync(async(req,res,next)=>{
    const EntityId = req.params.id
    const Attributes = await prismaDB.attributes.findMany({
        where:{
            entityId : Number(EntityId)
        }
    })
    res.status(200).json({
        sucess:true,
        Attributes
    })
})

const GetAttribute = CatchAsync(async(req,res,next)=>{
    const AttributeId = req.params.id
    const Attribute = await prismaDB.attributes.findUnique({
        where:{
            id : Number(AttributeId)
        }
    })
    if(!Attribute) next(ApiError(404, 'Attribute not found'))
    res.status(200).json({
        sucess:true,
        Attribute
    })
})


export { CreateAtribute , UpdateAttribute , GetAllAttributes , DeleteAttribute, GetAttribute }