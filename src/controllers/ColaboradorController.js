import colaborador from "../models/Colaborador.js";
import bcrypt from "bcryptjs";


class ColaboradorController{




    static listColaborador = (req, res) => {

        colaborador.find( (err, colaborador) => {
        res.status(200).json( colaborador ) })  

    }

    static async listColaboradorId(req, res) {

        const id = req.params.id;

        const UserColaborador = await colaborador.findById(id) 

            if(!UserColaborador){
            res.status(400).send({message : 'id não localizado'})
        } 

            res.status(200).json({UserColaborador});
        
        
    }

     static async registerColaborador (req, res) {

        const { Password ,Email_Colaborador, User, ComfirmaPassword, Type, parceiro, resetPasswordToken, resetPasswordExpires} = req.body;

        if(!User || !Password || !Email_Colaborador || !ComfirmaPassword || !Type){
            return res.status(422).json({message: "Todos os campos são obrigatorios Obrigatorio"})
        }

        if(ComfirmaPassword !== Password){
            return res.status(422).json({message: "Passwords devem ser iguais"})
        }

        function validateEmail(Email_Colaborador) {
            var re = /\S+@\S+.\S+/;
            return re.test(Email_Colaborador);
        }

        if(!validateEmail(Email_Colaborador)){
            return res.status(422).json({message: "Email invalido"})
        }



        const emailExist = await colaborador.findOne({Email_Colaborador})

        if(emailExist){
            return res.status(422).json({message: "Email já em uso tente outro"})
        }

        const salt = await bcrypt.genSalt(12)
        const Passwordhash = await bcrypt.hash(Password, salt)

        const Colaborador = new colaborador({
            User,
            Password : Passwordhash,
            Email_Colaborador,
            Type,
            parceiro,
            resetPasswordToken,
            resetPasswordExpires
        })

        try{

            await Colaborador.save()
            res.status(201).send(Colaborador);

        }catch(error){
            res.status(500).json({message: error.message})
        }



    }

    static updateColaborador = (req, res) => {
        const id = req.params.id;

        colaborador.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteColaborador = (req, res) =>{
        const id = req.params.id;

        colaborador.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Colaborador excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }


}




export default ColaboradorController;

//{
//    "User":"usuário teste",
//    "Password":"123teste",
//    "Email_Colaborador":"colaborador1@gmail.com",
//    "ComfirmaPassword":"123teste",
//    "parceiro":"64b97984cfc88afd84540b9a",
//    "Type":"null",
//    "resetPasswordToken": "null",
//   "resetPasswordExpires": "null"
//}




