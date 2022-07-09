const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const userAuth = require("./middlewares/userAuth");

const usuariosModel = require("./database/Cadastro");
const produtosModel = require("./database/Produto");
const bcrypt = require("bcryptjs");

//Static
app.use(express.static("public"));
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//View Engine
app.set("view engine", "ejs");
//Sessions
app.use(
	session({
		secret: "drestranho",
		cookie: { maxAge: 180000 },
	})
);

//Conexão banco
mongoose.connect(
	"mongodb://foodshop:123456food@cluster0-shard-00-00.221ud.mongodb.net:27017,cluster0-shard-00-01.221ud.mongodb.net:27017,cluster0-shard-00-02.221ud.mongodb.net:27017/?ssl=true&replicaSet=atlas-zpdpuk-shard-0&authSource=admin&retryWrites=true&w=majority"
);

//rotas
app.get("/", (req, res) => {
	res.render("login");
});

app.get("/cadastro", (req, res) => {
	res.render("cadastro");
});

app.get("/admin/cadastrar", userAuth ,(req, res) => {
	res.render("cadastrar-prato");
});

app.get("/carrinho", userAuth ,(req, res) => {
	res.render("carrinho");
});

app.get("/inicio", userAuth ,(req, res) => {
	res.render("inicio");
});

app.get("/cardapio" ,(req, res) => {
	res.render("cardapio");
});

app.post("/cadastro", (req, res) => {
	var nome = req.body.nome;
	var cpf = req.body.cpf;
	var email = req.body.email;
	var senha = req.body.senha;

	var salt = bcrypt.genSaltSync(13);
	var hash = bcrypt.hashSync(senha, salt);

	usuariosModel
		.create({
			nome: nome,
			cpf: cpf,
			email: email,
			senha: hash,
		})
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			res.redirect("cadastro");
		});
});

app.post("/admin/cadastrar", (req, res) => {
	var nomeProduto = req.body.nomeProduto;
	var preco = req.body.preco;
	var imagem = req.body.imagem;
	var descricao = req.body.descricao;
	var tipo = req.body.tipo;

	produtosModel
		.create({
			nomeProduto,
			preco,
			imagem,
			descricao,
			tipo,
		})
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			res.redirect("cadastro");
		});
});

app.post("/auth", (req, res) => {
	var email = req.body.email;
	var senha = req.body.senha;

	usuariosModel.findOne({ where: { email: email } }).then((user) => {
		if (user != undefined) {
			// Se existir um usuário com esse e-mail.
			var correct = bcrypt.compareSync(senha, user.senha);

			if (correct) {
				req.session.user = {
					id: user.id,
					email: user.email,
				};
				res.redirect("/cardapio");
			} else {
				res.redirect("/");
			}
		} else {
			res.redirect("/");
		}
	});
});

app.get("/logout", (req, res) => {
	req.session.user = undefined;
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
