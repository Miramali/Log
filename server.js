require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const {errorsLog, outputLog } = require('./middleware/logger');
// const logEvent = require('./middleware/logger');
const { logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')




const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cookieParser())
logEvents();
app.use(errorHandler)



var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 ,
    methods: "GET, PUT,POST,DELETE"
}

app.use(cors(corsOptions))

///////////////////////////////////////////////////////////////

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.get('/users',(req,res)=>{
    res.send("users app")
})
app.get('/products',(req,res)=>{
    res.send("products app")
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if (req.accepts('json')) {
        res.send({message:"404 not found"})
    } else {
        res.type('text').send('404 not found')

    }
})



mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})