const mongoose = require('mongoose');

const usuariosModel = new mongoose.Schema({
    nome: String,
    cpf: String,
    email:String,
    senha:String,
});

const Usuarios = mongoose.model("Usuarios", usuariosModel);
module.exports = Usuarios;