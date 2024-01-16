import mongoose from "mongoose";

const CertificadoSchema = new mongoose.Schema({

    responsavel:{type: mongoose.Schema.Types.ObjectId, ref:'Responsavel', required:true},
    Date_Expedition:{type:Date, required: true},
    Value_Certificado:{type: mongoose.Schema.Types.ObjectId, ref:'CertValor', required:true},
    discount:{type:Number},
    id:{type:String, required:true},
    empresa: {type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required:true},
});

const certificados = mongoose.model("Certificados", CertificadoSchema);



export default certificados;