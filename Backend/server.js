const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const UserRoute = require('./routes/UserRoute')
const AddressRoute= require('./routes/AddressRoute')

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,PUT,POST,DELETE', 
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(UserRoute)
app.use(AddressRoute)


const port = 4000
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})