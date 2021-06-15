const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { token } = require('morgan')
// const client = require('./init_redis')



module.exports = {
    signAccessToken: (userid) =>{
        return new Promise((resolve , reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn:"1d",
                issuer:"websiteNAme.com",
                audience : userid
            }
            JWT.sign(payload,secret,options, (err,token) => {
                if(err) {
                    console.log(err)
                    return reject(createError.InternalServerError())
                }

                return resolve(token)
               
            })
        })
    },
    verifyAccessToken: (req,res,next) =>{
        if(!req.headers['authorization']){
            return next(createError.Unauthorized())
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const accessToken = bearerToken[1]

        JWT.verify(accessToken,process.env.ACCESS_TOKEN_SECRET, (err,payload) => {
            if(err){
                const message = err.name === "JsonWebTokenError" ? 'unauthorized' :err.message
                next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    
}