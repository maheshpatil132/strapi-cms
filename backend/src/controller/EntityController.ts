import prismaDB from "../config/db"
import { CatchAsync } from "../utils/CatchAsync"
import { ApiError } from "../utils/ErrorHandler"


const CreateEntity = CatchAsync(async(req,res,next)=>{
    const ProjectId = req.params.id
    const { entityName } = req.body

    if(!entityName){
        return next(ApiError(404, "Entity name required"))
    }

    const existingEntity = await prismaDB.entity.findFirst({
        where: {
          name: entityName,
          projectId : Number(ProjectId)
        }
      });
    
      if (existingEntity) {
        return next(ApiError(203, "entity name should be unique"));
      }

    const NewEntity = await prismaDB.entity.create({
        data:{
            name : entityName,
            projectId : Number(ProjectId)
        }
    })
    res.status(200).json({
        sucess:true,
        message : "New entity Created Succesfully",
        NewEntity
    })
})

const UpdateEntity = CatchAsync(async(req,res,next)=>{
    const EntityId = req.params.id

    const exist = await prismaDB.entity.findFirst({
        where:{
            id : Number(EntityId)
        }
    })
    if(!exist) return next(ApiError(404 , "Entity is not exist"))
    const UpdatedEntity = await prismaDB.entity.update({
        where:{
            id : Number(EntityId)
        },
        data:{
            name : req.body.name
        }
    })
    res.status(200).json({
        sucess:true,
        message : "entity Updated Succesfully",
        UpdatedEntity
    })
})

const DeleteEntity = CatchAsync(async(req,res,next)=>{
    const EntityId = req.params.id
    const exist = await prismaDB.entity.findFirst({
        where:{
            id : Number(EntityId)
        }
    })
    if(!exist) return next(ApiError(404 , "Entity is not exist"))
    await prismaDB.entity.delete({
        where:{
           id : Number(EntityId)
        }
    })
        
    res.status(200).json({
        sucess:true,
        message : "entity deleted Succesfully",
    })
})

const GetAllEntities = CatchAsync(async(req,res,next)=>{
    const ProjectId = req.params.id
     
    const existProject = await prismaDB.project.findFirst({
        where:{
            id : Number(ProjectId)
        }
    })

    if(!existProject) return next(ApiError(404, "Project is not exist"))

    const entities = await prismaDB.entity.findMany({
        where:{
            projectId : Number(ProjectId)
        }
    })

    res.status(200).json({
        sucess:true,
        entities
    })
})

const GetEntity = CatchAsync(async(req,res,next)=>{
    const EntityId = req.params.id
    const entity = await prismaDB.entity.findUnique({
        where:{
            id : Number(EntityId)
        }
    })
    if(!entity) next(ApiError(404, 'entity not found'))
    res.status(200).json({
        sucess:true,
        entity
    })
})


export { CreateEntity , UpdateEntity , GetAllEntities ,GetEntity , DeleteEntity }