import mongoose from "mongoose";

mongoose.connect("this is secret");

let db = mongoose.connection;

export default db;