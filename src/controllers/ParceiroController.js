import parceiro from "../models/Parceiro.js"

class ParceiroController{

    static listParceiro = (req, res) => {

        parceiro.find( (err, parceiro) => {res.status(200).json(parceiro) }) 
    }

    static listParceiroId = (req, res) =>{

        const id = req.params.id;
        
        parceiro.findById(id).populate('Certificados', 'nome').exec((err, parceiro) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({parceiro});
            }
        })
    }

    static registerParceiro = (req, res) => {

        let user = new parceiro(req.body);

        user.save((err) => {
            if(err){
                res.status(500).send({message : `${err.message} - Falha ao salvar o parceiro`});
            }else{
                res.status(201).send(user.toJSON());
            }
        })

    }

    static updateParceiro = (req, res) => {
        const id = req.params.id;

        parceiro.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteParceiro = (req, res) =>{
        const id = req.params.id;

        parceiro.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "parceiro excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static listParceiroCertificado = (req, res) =>{

        const Nome = req.query.Nome

        parceiro.find({'Nome':Nome }, {}, (err, parceiro)=> {
            if(!err){
            res.status(200).send(parceiro)
            }
            else{
                res.status(500).send({message: err.message});
            }
        })
        
    }



}

export default ParceiroController;