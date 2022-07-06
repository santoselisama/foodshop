const addCarrinhoBtn = document.querySelectorAll(".add-carrinho");
const carrinhoArray = [];
let total = 0;

let totalLocalStorage = localStorage.getItem("total");
let carrinhoArrayLocalStorage = localStorage.getItem("carrinho");

const carrinho = JSON.parse(window.localStorage.getItem("carrinho"));

console.log(totalLocalStorage, carrinho);

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
			<td></td>
			<td>
				<button type="car" class="btn btn-dark fa fa-trash-o apagar">
					Apagar
				</button>
			</td>
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

	localStorage.setItem("total", total.toFixed(2));
	carrinhoArray.push({ preco, nomePrato });
	localStorage.setItem("carrinho", JSON.stringify(carrinhoArray));
	console.log(precoNum, nomePrato, totalLocalStorage);
	console.log(carrinhoArray);
};

for (let i = 0; i < addCarrinhoBtn.length; i++) {
	const btn = addCarrinhoBtn[i];
	btn.addEventListener("click", adicionarAoCarrinho);
}

const apagarItemBtn = document.querySelectorAll(".apagar");
for (let i = 0; i < apagarItemBtn.length; i++) {
	const btn = apagarItemBtn[i];
	btn.addEventListener("click", (e) => {
		const btnClicado = e.target;
		console.log(btnClicado.parentElement.parentElement);
		carrinho.forEach((item, index) => {
			if (
				btnClicado.parentElement.parentElement.cells[0].innerText === item.nomePrato
			) {
				carrinho.splice(index, 1);
				console.log(carrinho);
				btnClicado.parentElement.parentElement.remove();
				localStorage.setItem("carrinho", JSON.stringify(carrinho));
				totalLocalStorage = Number(
					totalLocalStorage - item.preco.replace("R$ ", "").replace(",", ".")
				).toFixed(2);
				localStorage.setItem("total", totalLocalStorage);
				totalTitulo.innerHTML = totalLocalStorage;
			}
		});
	});
}
