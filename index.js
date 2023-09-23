import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './src/db/DbConfig.js'
import insuranceRouter from './src/routers/InsuranceRouter.js'
connectDb()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/insurance',insuranceRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`server is listning on port ${process.env.PORT}`)
})

