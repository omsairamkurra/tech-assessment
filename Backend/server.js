const express=require('express')
const bodyParser=require('body-parser')
const { User,Address } = require('./database')
const app = express()
app.use(bodyParser.json())
const port = 4000


//users routes
app.post('/users', async(req,res)=>{
    const {name,email}=req.body
    try{
        const user=await User.create({name,email});
        res.status(201).json(user)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
})

app.get('/users', async(req,res)=>{
    try{
        const users=await User.findAll({include:Address})
        res.json(users)
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.put('/users/:id', async(req,res)=>{
    const {id}=req.params
    const {name,email}=req.body
    try{
        const user = await User.findOne(id)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        await user.update({name,email})
        res.json(user)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }    
})

app.delete('/users:/id',async(req,res)=>{
    const {id}=req.params
    try{
        const user = await User.findOne(id)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        await user.destroy()
        res.json({message:'User deleted successfully'})
    }catch(error){
        res.status(400).json({error:'Internal Server Error'})
    }
})

//address routes
app.post('/addresses',async(req,res)=>{
    const {userId,street,city,country}=req.body;
    try{
        const address=await Address.create({street,city,country,userId})
        res.status(201).json(address)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
})

app.get('/addresses',async(req,res)=>{
    try{
        const addresses=await Address.findAll({include:User});
        res.json(addresses)
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.put('addresses/:id',async(req,res)=>{
    const {id}=req.params
    const {street,city,country,userId}=req.body
    try{
        const address=await Address.findOne({where:{id}})
        if(!address){
            return res.status(404).json({error:"Address not found"})
        }
        await address.update({street,city,country,userId})
        res.json(address)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
})

app.delete('/addresses/:id', async(req,res)=>{
    const {id}=req.params
    try{
        const address=await Address.findOne(id)
        if(!address){
            return res.status(404).json({error:"Address not found"})
        }
        await address.destroy();
        res.json({message:'Address deleted successfully'})
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})