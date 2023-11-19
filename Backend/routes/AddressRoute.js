const express= require('express')
const {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController.js');

const router=express.Router()

router.get('/addresses',getAddresses)
router.post('/addresses',createAddress)
router.put('/addresses/:id',updateAddress)
router.delete('/addresses/:id',deleteAddress)


module.exports=router