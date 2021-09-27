//Importação da biblioteca para gerenciamento de rotas
const express = require('express')
const router = express.Router()

//Importação das ações de cada controller
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdsController = require('./controllers/AdsController')

//Importação dos middlewares
const Auth = require('./middlewares/Auth')

//Importação dos Validators
const AuthValidators = require('./validators/AuthValidators')
const UserValidators = require('./validators/UserValidators')

//Configuração de rotas
router.get('/ping', (req, res)=>{
    res.json({pong:true})
})

router.get('/states', UserController.getStates)//feito

router.get('/user/me', Auth.private, UserController.info)//feito
router.put('/user/me', UserValidators.editAction, Auth.private, UserController.editAction) //feito

router.post('/user/signin', AuthValidators.signin, AuthController.signin)//feito
router.post('/user/signup', AuthValidators.signup, AuthController.signup)//feito

router.get('/categories', AdsController.getCategories)//feito

router.post('/ad/add', Auth.private, AdsController.addAction) //feito
router.get('/ad/list', AdsController.getList) //feito com filtros
router.get('/ad/item', AdsController.getItem) 
router.post('/ad/:id', Auth.private, AdsController.editAction)


//Exportando o objeto com as rotas criadas
module.exports = router