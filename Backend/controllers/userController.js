const {User,Address} =require('../database')

const createUser  =  async(req,res)=>{
    const {name,email}=req.body
    try{
        const user=await User.create({name,email});
        res.status(201).json(user)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }
}

const getUsers  = async(req,res)=>{
    try{
        const users=await User.findAll({include:Address})
        res.status(201).json(users)
        
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'})
    }
}

const getUserById  =  async(req,res)=>{
    const id=parseInt(req.params.id);
    try {
        const user = await User.findByPk(id, { include: Address });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUser  =  async(req,res)=>{
    const {id}=req.params
    const {name,email,addresses}=req.body
    try{
        const user = await User.findByPk(id,{include:Address})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        await user.update({name,email})
        if (addresses && addresses.length > 0) {
            await Promise.all(
              addresses.map(async (addressData, index) => {
                let address;
                if (user.addresses && user.addresses.length > index) {
                  address = user.addresses[index];
                  await address.update(addressData);
                } else {
                  address = await Address.create({ ...addressData, userId: user.id });
                }
                user.addresses[index] = address;
              })
            );
          }
        res.json(user)
    }catch(error){
        res.status(400).json({error:'Bad Request'})
    }    
}

const deleteUser  =  async(req,res)=>{
    const {id}=req.params
    try{
        const user = await User.findByPk(id,{include:Address})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        await user.destroy()
        res.json({message:'User deleted successfully'})
    }catch(error){
        res.status(400).json({error:'Internal Server Error'})
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};