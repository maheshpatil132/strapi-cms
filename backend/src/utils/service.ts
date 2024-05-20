import JWT from 'jsonwebtoken'

const CreateToken = ({id , name} : { id : number, name : string})=>{
    return JWT.sign( { id , name} , "mahesh")
}

export {CreateToken}