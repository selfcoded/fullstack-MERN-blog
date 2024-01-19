// content to MongoDB
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

main().catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect(process.env.MONGOLINK)
}

// server staring 
import express from 'express';
import userRouter from './routes/user.js'
import authAdminRouter from './routes/auth.js'
import { noteRouter, projectRouter } from './routes/editRouter.js'
import User from './modals/User.js';
import cookieParser from 'cookie-parser';

const adminUser =  new User({
    username: 'admin',
    password: '123'
})

const app = express()
const port =  3000

app.use(cookieParser())

app.use(express.json())
app.listen(port, () => {
    console.log(`you have been listened at port: ${port}`);
})

app.use('/api', userRouter)
app.use('/api', authAdminRouter, projectRouter, noteRouter)


app.use((err, req, res, next) => {
const status = err.status || 500
const message = err.message || 'internal error!'

return res.status(status).json({
    success: false,
    status,
    message
})
})
