//carregando variaveis de ambiente
require('dotenv').config()

//importando bibliotecas
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

//importação de arquivos do projeto
const apiRoutes = require('./src/routes')

//Configuração da conecção com BD
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error)=>{
    console.log('Error: '+error.message)
})

//Configuração do servidor
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(fileUpload())
server.use(express.static(__dirname+'/public'))
server.use('/', apiRoutes)


server.listen(process.env.PORT, ()=>{
    console.log(` - Rodando no endereço: ${process.env.BASE}`)
})