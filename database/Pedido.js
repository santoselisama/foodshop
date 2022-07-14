const mongoose = require("mongoose");

const pedidosModel = new mongoose.Schema({
	carrinho: [
		{
			preco: String,
			nomePrato: String,
		},
	],
	total: String,
});

const Pedidos = mongoose.model("Pedidos", pedidosModel);
module.exports = Pedidos;
