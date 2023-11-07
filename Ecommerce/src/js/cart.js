const contenedorTarjeta = document.getElementById("productos-conteiner");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reniciarCarrito = document.getElementById("reiniciar");
function createTarjetaProductoInicio() {
  contenedorTarjeta.innerHTML = "";
  const producto = JSON.parse(localStorage.getItem("productos"));
  console.log(producto);
  if (products && products.length > 0) {
    products.forEach((product) => {
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
          cuentaElement.innerText = agregarAlCarrito(product);
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

const btnTacc = document.querySelector(".btn-tacc");
const btnVeggie = document.querySelector(".btn-veggie");
const btnKeto = document.querySelector(".btn-keto");
const btnNatural = document.querySelector(".btn-Natural");
const btnCosmetica = document.querySelector(".btn-cosmetica");

btnTacc.addEventListener("click", (e) => {
  loadSection("tacc");
});

btnKeto.addEventListener("click", (e) => {
  loadSection("Keto");
});

btnVeggie.addEventListener("click", (e) => {
  loadSection("vegano");
});

btnNatural.addEventListener("click", (e) => {
  loadSection("Natural");
});

btnCosmetica.addEventListener("click", (e) => {
  loadSection("cosmetica");
});

createTarjetaProductoInicio(products);
createTarjetaProductoInicio();
ctualizarTotales();
function actualizarTotales() {
  const product = JSON.parse(localStorage.getItem("productos"));
  let unidades = 0;
  let precio = 0;

  if (products && products.length > 0) {
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
revisarMensajeVacio();
reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("productos");
  actualizarTotales();
  createTarjetaProductoInicio();
}
