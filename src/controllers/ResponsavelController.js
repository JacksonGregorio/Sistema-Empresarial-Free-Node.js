import responsavel from "../models/Responsavel.js";

class ResponsavelController{

    static listResponsavel = (req, res) => {

        responsavel.find( (err, responsavel) => {
        res.status(200).json( responsavel ) })  

    }

    static listresponsavelId = (req, res) =>{

        const id = req.params.id;
        responsavel.findById(id, (err, responsavel) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({responsavel});
            }
        })
    }

    static registerResponsavel = (req, res) => {

        let user = new responsavel(req.body);

        user.save((err) => {
            if(err){
                res.status(500).send({message : `${err.message} - Falha ao salvar o responsavel`});
            }else{
                res.status(201).send(user.toJSON());
            }
        })

    }

    static updateResponsavel = (req, res) => {
        const id = req.params.id;

        responsavel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso responsavel"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteResponsavel = (req, res) =>{
        const id = req.params.id;

        responsavel.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Responsavel excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

}

export default ResponsavelController;