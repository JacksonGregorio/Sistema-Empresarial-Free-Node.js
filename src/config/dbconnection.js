import mongoose from "mongoose";

mongoose.connect("mongodb+srv://jackson:85201200@cluster0.odoujdh.mongodb.net/Colobe");

let db = mongoose.connection;

export default db;