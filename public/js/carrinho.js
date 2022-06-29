const addCarrinhoBtn = document.querySelectorAll(".add-carrinho");
const carrinhoArray = [];
let total = 0;

let totalLocalStorage = localStorage.getItem("total");
let carrinhoArrayLocalStorage = localStorage.getItem("carrinho");

const carrinho = JSON.parse(window.localStorage.getItem("carrinho"));

console.log(totalLocalStorage);

const totalTitulo = document.querySelector(".total-titulo");
if (totalTitulo) totalTitulo.innerHTML = totalLocalStorage;
if (!totalLocalStorage && totalTitulo) totalTitulo.innerHTML = 0;

if (carrinho)
	carrinho.map(({ nomePrato, preco }) => {
		const tbody = document.getElementsByTagName("tbody")[0];
		if (tbody)
			tbody.innerHTML += `
	<tr>
			<td>${nomePrato}</td>
			<td>${preco}</td>
	</tr>
	`;
		console.log(tbody);
	});

const adicionarAoCarrinho = (e) => {
	e.preventDefault();
	const btn = e.target;
	const cardTitle = btn.parentElement.parentElement;
	const preco = cardTitle.querySelectorAll(".preco")[0].innerText;
	const precoNum = +preco.replace("R$ ", "").replace(",", ".");
	const nomePrato = cardTitle.querySelectorAll(".nome-prato")[0].innerText;
	total += precoNum;
	localStorage.setItem("total", total);
	carrinhoArray.push({ preco, nomePrato });
	localStorage.setItem("carrinho", JSON.stringify(carrinhoArray));
	console.log(precoNum, nomePrato, totalLocalStorage);
	console.log(carrinhoArray);
};

for (let i = 0; i < addCarrinhoBtn.length; i++) {
	const btn = addCarrinhoBtn[i];
	btn.addEventListener("click", adicionarAoCarrinho);
}
