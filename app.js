import express from 'express'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'
dotenv.config()
const app = express()
app.use(express.json())
connectToDatabase()

import userRouter from './router/userRouter.js'
app.use(userRouter)


app.listen(process.env.PORT, () => {
    console.log(`port listned at ${process.env.PORT}`)
})