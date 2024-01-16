import certValor from "../models/ValorCertificado.js"

class CertificadoValorController{

    static listCertificadoValor = (req, res) => {

        certValor.find( (err, certValor) => {
        res.status(200).json( certValor ) })  

    }

    static listCertificadoValorId = (req, res) =>{

        const id = req.params.id;
        certValor.findById(id, (err, certValor) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({certValor});
            }
        })
    }

    static registerCertificadoValor = (req, res) => {

        let user = new certValor(req.body);

        user.save((err) => {
            if(err){
                res.status(500).send({message : `${err.message} - falha ao salvar o Certificado`});
            }else{
                res.status(201).send(user.toJSON());
            }
        })

    }

    static updateCertificadoValor = (req, res) => {
        const id = req.params.id;

        certValor.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteCertificadoValor = (req, res) =>{
        const id = req.params.id;

        certValor.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Certificado excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }



}

export default CertificadoValorController;