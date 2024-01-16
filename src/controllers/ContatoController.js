import contato from "../models/Contato.js";

class ContatoController{

    static listContato = (req, res) => {

        contato.find( (err, contato) => {
        res.status(200).json( contato ) })  

    }

    static listContatoId = (req, res) =>{

        const id = req.params.id;
        contato.findById(id, (err, contato) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({contato});
            }
        })
    }

    static cadastraContato = (req, res) => {

        let user = new contato(req.body);

        user.save((err) => {
            if(err){
                res.status(500).send({message : `${err.message} - falha ao salvar o contato`});
            }else{
                res.status(201).send(user.toJSON());
            }
        })

    }

    static updateContato = (req, res) => {
        const id = req.params.id;

        contato.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso contato"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteContato = (req, res) =>{
        const id = req.params.id;

        contato.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "contato excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }



}

export default ContatoController;