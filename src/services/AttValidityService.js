
import certValor from "../models/ValorCertificado.js";
import certificados from "../models/Certificado.js";
import Responsavel from "../models/Responsavel.js";

  class ValidityService {

      static async updateVencimentos(req, res) {

        const currentDate = new Date();

        const expiredCertificates = await certificados.find().populate('responsavel').populate({
          path: 'Value_Certificado',
          match: {Validity_Certificado: { $lt:currentDate } }
      });
        console.log(expiredCertificates  + 'certificados vencidos');
        
        let emails = [];
    
        for (let cert of expiredCertificates) {
            const responsavel = await Responsavel.findById(cert.responsavel);
            emails.push(responsavel.Email_Responsavel);
        }
    
        res.status(200).json(emails + '' + ' emails Responsaveis vencidos');
    }

    }

export default ValidityService;

