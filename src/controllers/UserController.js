
const { validationResult, matchedData } = require('express-validator')
const State = require('../models/State')
const User = require('../models/User')
const Category = require('../models/Category')
const Ad = require('../models/Ad')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports = {
    getStates: async (req, res)=>{
        let states = await State.find()
        res.json({states})
    },
    info: async (req, res)=>{
        let token = req.body.token

        const user = await User.findOne({token})
        const state = await State.findById(user.state)
        const ads = await Ad.find({idUser: user._id.toString()})

        let adList = []

        for(let i in ads){
            const cat = await Category.findById(ads[i].category)
            adList.push({ ...ads[i], category: cat.slug})
        }        

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList,
        })
    },
    editAction: async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({error: errors.mapped()})
        }
        const data = matchedData(req)

        const user = await User.findOne({token: data.token})

        let updates = {}

        if(data.name){
            updates.name = data.name
        }
        if(data.email){
            const emailCheck = await User.findOne({email:data.email})
            if(emailCheck){
                return res.json({error: 'Email já existente'})
            }
            updates.email= data.email
        }
        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){
                const statCheck = await State.findById(data.state)
                if(!statCheck){
                    return res.json({error: 'Estado inexistente'})
                }
                updates.state = data.state
            }else{
                return res.json({error: 'Código de Estado não existente'})
            }
        }
        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10)

        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates})

        res.json({user})
    },
}