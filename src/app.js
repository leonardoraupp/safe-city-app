require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser'); // é um middleware do Express que permite analisar o corpo das requisições HTTP.


const addressRoutes = require('./api/components/adress/routes')
const serviceRoutes = require('./api/components/adress/service')
const usersRoutes = require("./api/components/user/routes")

const { sequelize } = require('../models/index'); // Import sequelize instance

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} and ENV ${NODE_ENV}`)
})

// Adding headers to our requests.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE')
        return res.sendStatus(200).json({})
    }
    next()
})

app.use(express.urlencoded({ extended: true }))

// Configuração para receber JSON no corpo da requisição
app.use(bodyParser.json());

app.use('/address', addressRoutes) // Configuring addresses endpoints   
app.use('/address/:id', addressRoutes)
app.use('/address/service/:cep', serviceRoutes) // Configuring api service endpoint

app.use('/user', usersRoutes)
app.use('/user/:id', usersRoutes)
app.use('/users', usersRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message
    })
    next()
})

// Sync the database
/*sequelize.sync({ force: false }): This will synchronize your models with the database schema without dropping existing tables.
If you set force: true, it will drop and recreate the tables, which is useful for development but should be used with caution in production.*/
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});