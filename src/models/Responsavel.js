import mongoose from "mongoose";

const ResponsavelSchema = new mongoose.Schema(
    {
    CPF:{type: String, required:true},
    Email_Responsavel:{type:String, required:true},
    Tel_Responsavel:{type:Number, required:true},
    Ani_Responsavel:{type:Date, required: true},
    Name_Responsavel:{type:String, required:true},
    Parceiro:{type: mongoose.Schema.Types.ObjectId, ref:'Parceiro', required:true},
    RG:{type:String, required:true},
    Orgao_Expedidor:{type:String, required:true},
    Data_Expedicao:{type:Date, required:true},
    PIS:{type:String, required:true},
    CEI_KEPF:{type:String, required:true}
}
);

const responsavel = mongoose.model("Responsavel", ResponsavelSchema);

export default responsavel;