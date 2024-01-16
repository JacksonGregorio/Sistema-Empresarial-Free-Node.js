import mongoose from "mongoose";

const ValorCertificadoSchema = new mongoose.Schema(
    {
    Valor:{type:Number, required:true},
    Validity_Certificado:{type:Date, required:true},
    Type:{type:String, required: true},
    Name_Convenio:{type:String, required:true}
}
);

const certValor = mongoose.model("CertValor", ValorCertificadoSchema);

export default certValor;