import empresa from "../models/Empresa.js"

class EmpresaController{

    static listEmpresa = (req, res) => {

        empresa.find( (err, empresa) => {
        res.status(200).json( empresa ) })  

    }

    static listEmpresaId = (req, res) =>{

        const id = req.params.id;
        empresa.findById(id, (err, empresa) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({empresa});
            }
        })
    }

    static registerEmpresa = (req, res) => {

        let user = new empresa(req.body);

        user.save((err) => {
            if(err){
                res.status(500).send({message : `${err.message} - Falha ao salvar o empresa`});
            }else{
                res.status(201).send(user.toJSON());
            }
        })

    }

    static updateEmpresa = (req, res) => {
        const id = req.params.id;

        empresa.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso empresa"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteEmpresa = (req, res) =>{
        const id = req.params.id;

        empresa.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Empresa excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static listAllEmpresaNames = (req, res) => {
        empresa.find({}, 'Name_Empresa', (err, empresas) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falha ao buscar os nomes das empresas` });
            } else {
                res.status(200).json(empresas);
            }
        });
    }



}

export default EmpresaController;