const contenedorTarjetas = document.getElementById("cart-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");


/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function createTarjetaProductoCarrito() {
  contenedorTarjetas.innerHTML = "";
  const producto = JSON.parse(localStorage.getItem("dietetica"));
  if (producto && producto.length > 0) {
    producto.forEach((product) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
              <img src="${product.image || ''}" alt="${product.description}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <span class="precio">$${product.price}</span>
              <div>
                <button>-</button>
                <span class="cantidad">${product.cantidad}</span>
                <button>+</button>              
              </div>
             
          `;
          contenedorTarjetas.appendChild(nuevoProducto);

      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
        const cuentaCarritoElement = e.target.parentElement.querySelector(".cantidad");
        cuentaCarritoElement.innerText = restarAlCarrito(producto);
        createTarjetaProductoCarrito();
        actualizarTotales();
        });
      nuevoProducto
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }

  revisarMensajeCarrito();
  actualizarTotales();
  actualizarNumeroCarrito();

}

/** 
const loadSection = (section) => {
  contenedorTarjetas.innerHTML = "";
  products.forEach((product) => {
    if (product.category === section) {
      createTarjetaProductoInicio([producto]);
    }
  });
};
*/

createTarjetaProductoCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const product = JSON.parse(localStorage.getItem("dietetica"));
  let unidades = 0;
  let precio = 0;

  if (product && product.length > 0) {
    product.forEach((product) => {
      unidades += product.cantidad;
      precio = product.precio * product.cantidad;
    });
  }

  unidadesElement.innerText = unidades;
  precioElement.innerText = precio;

  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeCarrito();
  }
}

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeCarrito() {
  const productos = JSON.parse(localStorage.getItem("dietetica"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesElement.classList.toggle("escondido", !productos);
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeCarrito();
});
