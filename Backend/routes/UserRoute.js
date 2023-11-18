const express= require('express')
const {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController.js');
const router=express.Router()

router.get('/users',getUsers)
router.get('/users/:id',getUserById)
router.post('/users',createUser)
router.put('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)


module.exports = router;