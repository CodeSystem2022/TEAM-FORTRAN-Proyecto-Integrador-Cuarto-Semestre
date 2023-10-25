import {products} from "./products.js";

const contenedor = document.querySelector(".fila-productos");
const btnSection = document.querySelector(".btn-section");
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

window.addEventListener("load", loadSection('free-cruelty'));

btnSection.addEventListener("click", (e) => {
    const section = prompt("Ingresa el nombre de la sección");
    loadSection(section);
});