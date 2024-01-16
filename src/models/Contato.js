import mongoose from "mongoose";

const ContatoSchema = new mongoose.Schema(
    {
    Email_Contato:{type:String, required:true},
    Tel_Contato:{type:Number, required:true},
    Ani_Contato:{type:Date, required: true},
    Name_Contato:{type:String, required:true},
    Office:{type:String, required:true},
    empresa: {type: mongoose.Schema.Types.ObjectId, ref: 'Empresa'}
}
);

const contato = mongoose.model("Contato", ContatoSchema);

export default contato;