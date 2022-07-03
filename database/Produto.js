const mongoose = require('mongoose');

const produtosModel= new mongoose.Schema({
    nomeProduto: String,
    preco: Number,
    imagem: String,
    descricao: String,
    tipo: String,
});

const Produtos= mongoose.model("Produtos", produtosModel);
module.exports= Produtos;