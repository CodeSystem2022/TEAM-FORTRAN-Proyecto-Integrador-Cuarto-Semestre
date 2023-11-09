function agregarAlCarrito(producto) {
  contenedorTarjeta.innerHTML = "";
  const memoria = JSON.parse(localStorage.getItem("dietetica"));
  let cuenta = 0;
  console.log(memoria);
  if (!memoria) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("dietetica", JSON.stringify([nuevoProducto]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(
      (product) => product.id === producto.id
    );
    console.log(indiceProducto);
    if (indiceProducto === -1) {
      const nuevaMemoria = [...memoria]; // Hacer una copia del arreglo existente
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
      localStorage.setItem("dietetica", JSON.stringify(nuevaMemoria));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;

      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("dietetica", JSON.stringify(memoria));
    return cuenta;
  }
  actualizarNumeroCarrito();
  return cuenta;
}

//Funcion restar
function restarAlCarrito(product) {
  const memoria = JSON.parse(localStorage.getItem("dietetica"));
  const indiceProducto = memoria.findIndex(
    (product) => product.id === producto.id
  );
  localStorage.setItem("dietetica", JSON.stringify(memoria));
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
    localStorage.setItem("dietetica", JSON.stringify(memoria));
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("dietetica", JSON.stringify(memoria));
  actualizarNumeroCarrito();
}

/*Toma un producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/*Cuenta cuantos productos hay en el carrito*/
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("dietetica"));
  if (memoria && memoria.length > 0) {
    const cuenta = memoria.reduce(
      (acum, current) => acum + current.cantidad,
      0
    );
    cuentaCarritoElement.innerText = cuenta;
    console.log(cuenta);
  } else {
    cuentaCarritoElement.innerText = 0;
  }
}

actualizarNumeroCarrito();
