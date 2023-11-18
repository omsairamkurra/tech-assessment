const {Address,User} = require('../database')

const createAddress = async(req,res)=>{
    const {userId,street,city,country}=req.body;
    try{
        const address=await Address.create({street,city,country,userId})
        res.status(201).json(address)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
}

const getAddresses = async(req,res)=>{
    try{
        const addresses=await Address.findAll({include:User});
        res.json(addresses)
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
}

const getAddressById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateAddress = async(req,res)=>{
    const {id}=req.params
    const {street,city,country,userId}=req.body
    try{
        const address=await Address.findByPk(id,{include:User})
        if(!address){
            return res.status(404).json({error:"Address not found"})
        }
        await address.update({street,city,country,userId})
        res.json(address)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
}

const deleteAddress =  async(req,res)=>{
    const {id}=req.params
    try{
        const address=await Address.findByPk(id,{include:User})
        if(!address){
            return res.status(404).json({error:"Address not found"})
        }
        await address.destroy();
        res.json({message:'Address deleted successfully'})
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports={
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
}