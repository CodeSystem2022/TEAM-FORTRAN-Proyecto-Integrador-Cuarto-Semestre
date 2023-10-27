import {products} from "./products.js";
console.log('hola');
const contenedor = document.querySelector(".fila-productos");
const createProduct = ({name, price, image, description}) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img src="${image}" alt="${description}">
    <h2>${name}</h2>
    <p>${description}</p>
    <span class="precio">$${price}</span>
    <button>Añadir al carrito</button>`;
    contenedor.appendChild(div);
}

const loadSection = (section) => {
    contenedor.innerHTML = "";
    products.forEach( product => {
        product.category === section ? createProduct(product) : null
    });
}

const btnTacc = document.querySelector(".btn-tacc");
const btnVeggie = document.querySelector(".btn-veggie");
const btnKeto = document.querySelector(".btn-keto");
const btnAlmacen = document.querySelector(".btn-natural");
const btnCosmetica = document.querySelector(".btn-cosmetica");

btnTacc.addEventListener("click", (e) => {
    loadSection('tacc');
});

btnKeto.addEventListener("click", (e) => {
    loadSection('Keto');
});

btnVeggie.addEventListener("click", (e) => {
    loadSection('vegano');
});

btnAlmacen.addEventListener("click", (e) => {
    loadSection('almacen');
});

btnCosmetica.addEventListener("click", (e) => {
    loadSection('cosmetica');
})
