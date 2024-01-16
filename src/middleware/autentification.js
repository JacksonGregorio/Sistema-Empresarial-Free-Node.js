import  Jwt  from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";


async function checkToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message: 'token não informado'})
    }

    try {

        const secret = jsonSecret.secret

        Jwt.verify(token, secret)

        return next()
        
    } catch (error) {

        return res.status(401).json({message:'User não autorizado'})
        

        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc5NzI5NjQsImV4cCI6M
        //TY4ODA1OTM2NH0.vqTWJwy_mq694_fab__6Pn8WERehGBI85nnFI8rFFB0
        
    }
        
}

export default checkToken;