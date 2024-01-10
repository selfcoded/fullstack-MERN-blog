// content to MongoDB
require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect(process.env.MONGOLINK)
}

// server staring 
const express = require('express')
const app = express()
const port =  3000

app.use(express.json())
app.listen(port, () => {
    console.log(`you have been listened at port: ${port}`);
})

app.get('/', (req, res) => {
    res.send('hello world')
})
