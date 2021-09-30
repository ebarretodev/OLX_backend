const { validationResult, matchedData } = require('express-validator')
const User = require('../models/User')
const State = require('../models/State')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports = {
    signin: async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({error: errors.mapped()})
        }
        const data = matchedData(req)

        const user = await User.findOne({email: data.email})
        //validando o email
        if(!user){
            return res.json({error: 'E-mail e/ou senha errados!'})
        }
        //validando a senha
        const match = await bcrypt.compare(data.password, user.passwordHash)
        if(!match){
            return res.json({error: 'E-mail e/ou senha errados!'})
        }
        //Gera um novo token para acesso e salva no BD.
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)
        user.token = token
        await user.save()
        res.json ( { token, email: data.email})

    },
    signup: async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({error: errors.mapped()})
        }
        const data = matchedData(req)
        //Verifica se email existe no BD
        const user = await User.findOne({
            email: data.email
        })
        if(user){
            return res.json({
                error: {
                    email: {msg: 'E-mail já existe'}
                }
            })
        }
        //Verifica se o Estado é válido
        if(mongoose.Types.ObjectId.isValid(data.state)){
            //Verifica se o Estado existe 
            const stateItem = await State.findById(data.state)
            if(!stateItem){
                return res.json({
                    error: {
                        state: {msg: 'Estado não existe'}
                    }
                })
            }
        }else{
            return res.json({
                error: {
                    state: {msg: 'Código de Estado não existe'}
                }
            })

        }
        
        const passwordHash = await bcrypt.hash(data.password, 10)

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        const newUser = new User({
            name: data.name,
            email: data.email,
            state: data.state,
            passwordHash,
            token
        })

        await newUser.save()


        res.status(201)
        res.json({token})
    },
}