const User = require('../models/User')

module.exports = {
    private: async (req, res, next)=>{
        //verifica se recebeu token de usuário
        if(!req.query.token && !req.body.token){return res.json({notAllowed: true})}
        let token = ''
        if(req.query.token){token=req.query.token}
        if(req.body.token){token=req.body.token}
        //verifica se o token está vazio
        if(token == ''){return res.json({notAllowed: true})}
        //procura o token no Banco de Dados
        const user = await User.findOne({token})
        //Senão tiver token no Banco de dados para
        if(!user){return res.json({notAllowed: true})}
        //Se valido passa para a próxima etapa
        next()
    }
}