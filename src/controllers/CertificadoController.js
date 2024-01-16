import certificados from "../models/Certificado.js"
import empresa from "../models/Empresa.js";
import certValor from "../models/ValorCertificado.js";

class CertificadoController{

    static listCertificado = (req, res) => {

        certificados.find( (err, certificados) => {
        res.status(200).json( certificados ) })  

    }

    static listCertificadoId = (req, res) =>{

        const id = req.params.id;
        certificados.findById(id, (err, certificados) =>{
            if(err){
                res.status(400).send({message : `${err.message} - id não localizado`})
            } else{
                res.status(200).send({certificados});
            }
        })
    }

    static registerCertificado = (req, res) => {

        const nameEmpresa = req.body.empresa;

        empresa.findOne({ Name_Empresa: nameEmpresa }, (err, empresa) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao buscar a empresa` });
            } else if (!empresa) {
                res.status(404).send({ message: 'Empresa não encontrada' });
            } else {
                
                let certificadoData = req.body;
                certificadoData.empresa = empresa._id; 
    
                let certificado = new certificados(certificadoData);
    
                certificado.save((err) => {
                    if (err) {
                        res.status(500).send({ message: `${err.message} - falha ao salvar o Certificado` });
                    } else {
                        res.status(201).send(certificado.toJSON());
                    }
                });
            }
        });

    }

    static updateCertificado = (req, res) => {
        const id = req.params.id;

        certificados.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Atualizado com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteCertificado = (req, res) =>{
        const id = req.params.id;

        certificados.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: "Certificado excluido com sucesso"});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static listCertificadoCNPJ = async (req, res) => {
        const { CNPJreq } = req.params;
    
        empresa.findOne({ CNPJ: CNPJreq }, (err, empresa) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao buscar o CNPJ` });
            } else if (!empresa) {
                res.status(404).send({ message: 'CNPJ não encontrada' });
            } else {
                
                const certificadoData = empresa._id; 
    
                certificados.findOne({ empresa: certificadoData }, (err, certificados) => {
                    if (err) {
                        res.status(500).send({ message: `${err.message} - falha ao procurar` });
                    } else {
                        res.status(201).send(certificados.toJSON());
                    }
                });
            }
        });
    }

    static listCertificadoCNPJexpired = async (req, res) => {
        const { CNPJreq } = req.params;
    
        try {
            const Empresa = await empresa.findOne({ CNPJ: CNPJreq });
    
            if (!Empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            console.log(Empresa + 'empresa')
            
            const now = new Date();
            const Certificados = await certificados.find({ 
                empresa: Empresa._id
            })
            .populate('empresa')
            .populate({
                path: 'Value_Certificado',
                match: {Validity_Certificado: { $lt: now } }
            });

            console.log(Certificados)
            const certificadosVencidos = Certificados.filter(certificado => certificado.Value_Certificado && certificado.Value_Certificado.Validity_Certificado < now);
            
            res.json(certificadosVencidos);
            console.log(certificadosVencidos + 'certificados vencidos')
        } catch (err) {
            res.status(500).json(err + 'erro');
        }
    }

}

export default CertificadoController;

//{
//    "responsavel":"Ditetor 1",
//    "Date_Expedition":"2024-11-22",
//    "Value_Certificado":"64b98e07cfc88afd84540ba5",
//    "discount":"10",
//   "id":"123456789",
//    "empresa": "64b97b45cfc88afd84540b9e"
//}