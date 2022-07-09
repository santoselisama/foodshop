const mongoose = require("mongoose");

const pedidosModel = new mongoose.Schema({
	carrinho: Array,
	total: String,
});

const Pedidos = mongoose.model("Pedidos", pedidosModel);
module.exports = Pedidos;
