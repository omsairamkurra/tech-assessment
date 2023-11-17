const {Sequelize,DataTypes} =require('sequelize')

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'database.sqlite'
})

//Define User model
const User=sequelize.define('user',{
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(128),
        allowNull:false,
        unique: true,
    },
});

//Define Address model
const Address=sequelize.define("address",{
    street:{
        type: DataTypes.STRING(128),
        allowNull:false,
    },
    city:{
        type: DataTypes.STRING(50),
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING(50),
        allowNull:false,
    }
})


User.hasMany(Address)
Address.belongsTo(User)


sequelize.sync()
    .then(()=>{
        console.log('Database & Tables created')
    })
    .catch((error)=>{
        console.log('Unable to connect to the database:', error)
    })


module.exports={
    User,
    Address,
    sequelize
}