import { products } from "./products.js";

const contenedorTarjeta = document.querySelector(".fila-productos");

function createTarjetaProductoInicio(products) {
    products.forEach(product => { 
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";
        nuevoProducto.innerHTML = `
           <img src="${product.image}" alt="${product.description}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="precio">$${product.price}</span>
            <button data-product-id="${product.id}">Añadir al carrito</button> 
        `;
        contenedorTarjeta.appendChild(nuevoProducto);

        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(product));
        
    });
}

const loadSection = (section) => {
    contenedorTarjeta.innerHTML = "";
    products.forEach(product => {
        if (product.category === section) {
            createTarjetaProductoInicio([product]);
        }
    });
}

const btnTacc = document.querySelector(".btn-tacc");
const btnVeggie = document.querySelector(".btn-veggie");
const btnKeto = document.querySelector(".btn-keto");
const btnNatural = document.querySelector(".btn-Natural");
const btnCosmetica = document.querySelector(".btn-cosmetica");

// Destacados
const btnVeganoDestacado = document.querySelector(".btn-vegano-destacado");
const btnKetoDestacado = document.querySelector(".btn-keto-destacado");
const btnNaturalDestacado = document.querySelector(".btn-natural-destacado");


btnTacc.addEventListener("click", (e) => {
    loadSection('tacc');
});

btnKeto.addEventListener("click", (e) => {
    loadSection('Keto');
});

btnVeggie.addEventListener("click", (e) => {
    loadSection('vegano');
});

btnNatural.addEventListener("click", (e) => {
    loadSection('Natural');
});

btnCosmetica.addEventListener("click", (e) => {
    loadSection('cosmetica');
})

// Destacados

btnVeganoDestacado.addEventListener("click", (e) => {
    loadSection('VeganoDestacado'); // Cambia 'VeganoDestacado' por el nombre real de tu categoría destacada
});

btnKetoDestacado.addEventListener("click", (e) => {
    loadSection('KetoDestacado'); // Cambia 'VeganoDestacado' por el nombre real de tu categoría destacada
});

btnNaturalDestacado.addEventListener("click", (e) => {
    loadSection('NaturalDestacado'); // Cambia 'VeganoDestacado' por el nombre real de tu categoría destacada
});

