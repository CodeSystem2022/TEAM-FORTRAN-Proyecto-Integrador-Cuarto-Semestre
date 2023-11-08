const contenedorTarjeta = document.getElementById("fila-productos");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");
function createTarjetaProductoInicio() {
  contenedorTarjeta.innerHTML = "";
  const producto = JSON.parse(localStorage.getItem("productos"));
  console.log(producto);
  if (producto && producto.length > 0) {
    producto.forEach((product) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
              <img src="${product.image}" alt="${product.description}">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <span class="precio">$${product.price}</span>
              <div>
                <button>-</button>
                </span class="cantidad">${product.cantidad}</span>
                <button>+</button>              
              </div>
             
          `;
      contenedorTarjeta.appendChild(nuevoProducto);

      nuevoProducto
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          agregarAlCarrito(product);
          const cuentaCarritoElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaCarritoElement.innerText = agregarAlCarrito(product);
          actualizarTotalesctualizarTotales();
        });
      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(product);
          createTarjetaProductoInicio();
          actualizarTotales();
        });
    });
  }
}

const loadSection = (section) => {
  contenedorTarjeta.innerHTML = "";
  products.forEach((product) => {
    if (product.category === section) {
      createTarjetaProductoInicio([product]);
    }
  });
};

//createTarjetaProductoInicio(products);
createTarjetaProductoInicio();
actualizarTotales();

function actualizarTotales() {
  const product = JSON.parse(localStorage.getItem("productos"));
  let unidades = 0;
  let precio = 0;

  if (product && product.length > 0) {
    product.forEach((product) => {
      unidades += product.cantidad;
      precio = product.precio * product.cantidad;
    });
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
  }
}

function revisarMensajeCarrito() {
  const productos = JSON.parse(localStorage.getItem("producto"));
  carritoVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  carritoVacioElement.classList.toggle(
    "escondido",
    !productos && productos.length > 0
  );
  totalesElement.classList.toggle("escondido", productos);
}

revisarMensajeCarrito();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);

function reiniciarCarrito() {
  localStorage.removeItem("productos");
  actualizarTotales();
  createTarjetaProductoInicio();
}
