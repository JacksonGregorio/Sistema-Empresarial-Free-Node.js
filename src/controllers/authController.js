
import colaborador from "../models/Colaborador.js";
import bcrypt from "bcryptjs";
import  Jwt   from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

class AuthController{

    static async login(req,res){

        const  {Email_Colaborador, Password} = req.body

        if(!Password || !Email_Colaborador){
            return res.status(422).json({message: "Todos os campos são obrigatorios Obrigatorio"})
        }

        const Registration = await colaborador.findOne({Email_Colaborador:Email_Colaborador})

        if(!Registration){
            return res.status(404).json({message: "Email utilizado não encontrado"})
        }

        const checkPassword = await bcrypt.compare(Password, Registration.Password)

        if(!checkPassword){

            return res.status(404).json({message: "Password utililzada esta incorreta"})
        }

        try {

            const secret = jsonSecret.secret

            const token = Jwt.sign({
                id: Registration.id,

            },
            secret,
            {
                expiresIn:86400
            })

            //const {id, Email_Colaborador} = await decode(token)
            //req.Userid = id
            //req.UserEmail = Email_Colaborador

            res.setHeader('Authorization', 'Bearer ' + token);
            res.status(200).json({message:'Autentificação feita com sucesso', token, Email_Colaborador:Registration.Email_Colaborador, Type:Registration.Type, User:Registration.User})

            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error.message})
        }
        


        //"Email_Colaborador":"teste5@hotmail.com",
        //"Password":"teste123"


    }

}

export default  AuthController