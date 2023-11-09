import { products } from "./products.js";

const contenedorTarjeta = document.querySelector(".fila-productos");
//const seccionProductos = document.querySelector(".fila-productos");


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

// Boton inicio
const btnInicio = document.getElementById("btn-inicio");
btnInicio.addEventListener("click", () => {
  location.reload();
});



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




//loggin boton activar 

document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});



// Agregar event listener al botón "Sing up" en el formulario de registro
document.querySelector("#show-register").addEventListener("click", function () {
  openRegisterForm();
});

// Función para abrir el formulario de registro
function openRegisterForm() {
  var registerPopup = document.querySelector("#registerPopup");
  registerPopup.classList.add("active");
}


document.querySelector("#registerPopup .close-btn").addEventListener("click", function () {
    document.querySelector("#registerPopup").classList.remove("active");
});

// Agregar event listener al botón "Back to Login" en el formulario de registro
document.querySelector("#showLoginFromRegister").addEventListener("click", function () {
  var registerPopup = document.querySelector("#registerPopup");
  registerPopup.classList.remove("active");
  openLoginForm();
});

fetch('/api/user/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    if (data.redirect) {
        window.location.href = data.redirect;
    } else {
        // Maneja otras respuestas o realiza otras acciones
    }
})
.catch(error => {
    console.error('Error:', error);
});