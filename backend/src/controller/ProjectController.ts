import prismaDB from "../config/db";
import { CatchAsync } from "../utils/CatchAsync";
import { ApiError } from "../utils/ErrorHandler";

const CreateProject = CatchAsync(async (req, res, next) => {
  //@ts-ignore
  const UserId = req.user;
  
  const { projectName } = req.body;

  if (!projectName) {
    return next(ApiError(302, "ProjectName is required"));
  }

  const Project = await prismaDB.project.findFirst({
    where: {
      name: projectName,
      userId: Number(UserId),
    },
  });

  if (Project) {
    return next(ApiError(422, "Project name should be unique"));
  }

  const NewProject = await prismaDB.project.create({
    data: {
      name: projectName,
      userId: Number(UserId),
    },
  });
  res.status(200).json({
    sucess: true,
    message: "New project Created Succesfully",
    NewProject,
  });
});

const UpdateProject = CatchAsync(async (req, res, next) => {
  //@ts-ignore
  const userId = req.user;
  const projectId = Number(req.params.id);
  const {name} = req.body

  const existingProject = await prismaDB.project.findUnique({
    where: {
      id: projectId,
      userId: Number(userId),
    },
  });

  // If the project does not exist, return a 404 error
  if (!existingProject) {
    return next(ApiError(404, "Project not found"));
  }

  // Check if project with the same name already exists for the user
  const existingProjectWithName = await prismaDB.project.findFirst({
    where: {
      name,
      userId: Number(userId),
      NOT: { id: projectId } // Exclude current project
    },
  });

  if (existingProjectWithName) {
    return next(ApiError(400, "Project name must be unique"));
  }



  const updatedProject = await prismaDB.project.update({
    where: {
      id: projectId,
      userId: userId,
    },
    data: {
      ...req.body,
    },
  });
  if (!updatedProject) return next(ApiError(404, "Project not found"));

  res.status(200).json({
    sucess: true,
    message: "Project Updated Successfully",
    updatedProject,
  });
});

const GetAllProject = CatchAsync(async (req, res, next) => {
  const Projects = await prismaDB.project.findMany({});
  res.status(200).json({
    sucess: true,
    Projects,
  });
});

const DeleteProject = CatchAsync(async (req, res, next) => {
  const ProjectID = Number(req.params.id);
  
  const existingProject = await prismaDB.project.findUnique({
    where: {
      id: ProjectID,
    },
  });

  if (!existingProject) {
    return next(ApiError(404, "Project not found"));
  }

  const Project = await prismaDB.project.delete({
    where: {
      id: ProjectID,
    },
  });


  if (!Project) return next(ApiError(404, "Project not exist"));

  res.status(404).json({
    sucess: true,
    message: "Project deleted Sucessfully",
  });
});

const GetMyProject = CatchAsync(async (req, res, next) => {
  // @ts-ignore
  const UserId = req.user;
  const Projects = await prismaDB.project.findMany({
    where: {
      userId: UserId,
    },
    include:{
      entities : {
        include:{
          attributes:{
            include:{
              values : true
            }
          }
        }
      }
    }
  });
  res.status(200).json({
    sucess: true,
    Projects,
  });
});

export {
  CreateProject,
  UpdateProject,
  DeleteProject,
  GetAllProject,
  GetMyProject,
};
