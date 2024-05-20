import prismaDB from "../config/db";
import { CatchAsync } from "../utils/CatchAsync";
import { ApiError } from "../utils/ErrorHandler";

const InsertValue = CatchAsync(async (req, res, next) => {
  const Attribute_id = req.params.id;
  const { value } = req.body;

  const attribute = await prismaDB.attributes.findUnique({
    where: { id: Number(Attribute_id) },
    select: { type: true },
  });

  if (!attribute) {
    return next(ApiError(404, "Attribute not found"));
  }

  if (typeof attribute.type !== typeof value) {
    return next(ApiError(303 , "Invalid value type"));
  }

  const Newvalue = await prismaDB.value.create({
    data: {
      attributeId: Number(Attribute_id),
      value: value
    },
  });
  
  res.status(200).json({
    sucess: true,
    message: "New entity Created Succesfully",
    Newvalue,
  });
});

const UpdateValue = CatchAsync(async (req, res, next) => {
  const valueId = req.params.id;
  const {value} = req.body

  const existingValue = await prismaDB.value.findFirst({
    where: { id: Number(valueId) },
    select:{
       attribute : true
    }
});

if (!existingValue) {
    return next(ApiError(404 , 'Value not found'));
}
console.log(existingValue.attribute , typeof value);
if (typeof existingValue.attribute.type !== typeof value) {
    return next(ApiError(303 , "Invalid value type"));

  }

const UpdatedValue =  await prismaDB.value.update({
    where: { id: Number(valueId) },
    data: {
        value: String(value), 
    },
});

  res.status(200).json({
    sucess: true,
    message: 'Value updated successfully',
    UpdatedValue,
  });
});

const DeleteValue = CatchAsync(async (req, res, next) => {
  const valueId = req.params.id;

  const existingValue = await prismaDB.value.findFirst({
    where: { id: Number(valueId) },
    select:{
       attribute : true
    }
});

if (!existingValue) {
    return next(ApiError(404 , 'Value not found'));
}
 await prismaDB.value.delete({
    where: {
      id: Number(valueId),
    },
  });
  res.status(200).json({
    sucess: true,
    message: "Value deleted Succesfully",
  });
});

const GetAllValues = CatchAsync(async (req, res, next) => {
  const attributeId = req.params.id;
  const Attributes = await prismaDB.value.findMany({
    where: {
      attributeId: Number(attributeId),
    },
  });
  res.status(200).json({
    sucess: true,
    Attributes,
  });
});

const GetSingleValue = CatchAsync(async (req, res, next) => {
  const valueId = req.params.id;
  const value = await prismaDB.value.findUnique({
    where: {
      id: Number(valueId),
    },
  });
  if (!value) next(ApiError(404, "value not found"));
  res.status(200).json({
    sucess: true,
    value
  });
});


export {
    InsertValue,
    UpdateValue,
    DeleteValue,
    GetAllValues,
    GetSingleValue,
};
