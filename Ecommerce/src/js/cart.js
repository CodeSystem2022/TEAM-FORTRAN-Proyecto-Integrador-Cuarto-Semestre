const contenedorTarjetas = document.getElementById("cart-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
var comprarBtn = document.getElementById('comprar');
var siguienteBtn = document.getElementById('siguiente');

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function createTarjetaProductoCarrito() {
    // Limpia el contenido actual del contenedor de tarjetas en el carrito
    contenedorTarjetas.innerHTML = "";

    // Obtiene la información de productos desde el LocalStorage
    const productos = JSON.parse(localStorage.getItem("dietetica"));

    // Verifica si hay productos en el carrito
    if (productos && productos.length > 0) {
        // Crea un fragmento de documento para mejorar la eficiencia al agregar múltiples elementos al DOM
        const fragment = document.createDocumentFragment();

        // Itera sobre cada producto en el carrito
        productos.forEach((product) => {
            // Crea un nuevo elemento de tarjeta de producto
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "tarjeta-producto";
            nuevoProducto.innerHTML = `
                <img src="${product.image || ''}" alt="${product.description}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="precio">$${product.price}</span>
                <div>
                    <button data-product-id="${product.id}"> - </button>
                    <span class="cantidad">${product.cantidad}</span>
                    <button data-product-id="${product.id}"> + </button>
                </div>
            `;

            // Agrega el nuevo producto al fragmento
            fragment.appendChild(nuevoProducto);

            // Agrega event listener al botón "-" en la tarjeta del producto en el carrito
            nuevoProducto
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    // Resta una unidad al carrito y actualiza la interfaz
                    const cuentaCarritoElement = e.target.parentElement.querySelector(".cantidad");
                    cuentaCarritoElement.innerText = restarAlCarrito({ id: product.id });
                    createTarjetaProductoCarrito();
                    actualizarTotales();
                    revisarMensajeCarrito();
                    actualizarNumeroCarrito();
                });

            // Agrega event listener al botón "+" en la tarjeta del producto en el carrito
            nuevoProducto
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    // Añade una unidad al carrito y actualiza la interfaz
                    const cantidadElement = e.target.parentElement.querySelector(".cantidad");
                    cantidadElement.innerText = agregarAlCarrito({ id: product.id });
                    actualizarTotales();
                    revisarMensajeCarrito();
                    actualizarNumeroCarrito();
                });
        });

        // Agrega el fragmento con todas las tarjetas al contenedor
        contenedorTarjetas.appendChild(fragment);
    } else {
        // Si no hay productos, muestra un mensaje en el carrito
        revisarMensajeCarrito();
    }

    // Actualiza los totales y el número del carrito después de realizar cambios
    actualizarTotales();
    actualizarNumeroCarrito();
}

createTarjetaProductoCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
    const product = JSON.parse(localStorage.getItem("dietetica"));
    let unidades = 0;
    let precio = 0;

    if (product && product.length > 0) {
        product.forEach((product) => {
            unidades += product.cantidad;
            precio += product.price * product.cantidad;
        });
    }

    unidadesElement.innerText = unidades;
    precioElement.innerText = precio.toFixed(2); // Formatea el precio con dos decimales

    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeCarrito();
    }
}

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeCarrito() {
    const productos = JSON.parse(localStorage.getItem("dietetica"));
    comprarBtn = document.querySelector('#totales button');

    if (!productos || productos.length === 0) {
        // No hay productos, muestra el mensaje
        document.getElementById("carrito-vacio").style.display = "block";
        comprarBtn.setAttribute('disabled', 'true');
    } else {
        // Hay productos, oculta el mensaje
        document.getElementById("carrito-vacio").style.display = "none";
        comprarBtn.removeAttribute('disabled');
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
    revisarMensajeCarrito();
    actualizarTotales();
});

// Agrega un evento de clic al botón "Comprar" para mostrar el modal
comprarBtn.addEventListener('click', function() {
    var modal = document.getElementById('modal');
    modal.style.display = 'flex';
});

// Agrega un evento de clic al botón "Siguiente" para redirigir a index.html
siguienteBtn.addEventListener('click', function () {
    // Reinicia la memoria (LocalStorage)
    localStorage.removeItem("dietetica");
    window.location.href = 'index.html';
});

// Llama a revisarMensajeCarrito() al cargar la página
window.addEventListener('load', () => {
    revisarMensajeCarrito();
});

