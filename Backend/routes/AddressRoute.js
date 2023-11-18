const express= require('express')
const {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController.js');

const router=express.Router()

router.get('/addresses',getAddresses)
router.get('/addresses/:id',getAddressById)
router.post('/addresses',createAddress)
router.put('/addresses/:id',updateAddress)
router.delete('/addresses/:id',deleteAddress)


module.exports=router