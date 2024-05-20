import express from 'express'
import MainRouter from './routes/index'
import { errors } from './utils/error'
import cors from 'cors'

const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())

app.use('/api/v1', MainRouter)
app.use(errors)
app.listen(4000, ()=>{
    console.log("server is listening on port 4000");
})
