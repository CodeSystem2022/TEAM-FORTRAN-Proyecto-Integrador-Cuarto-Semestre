const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto) {
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("dietetica"));
  let cantidadProductoFinal;
  
  //Si no hay localstorage lo creo
  if (!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("dietetica", JSON.stringify([nuevoProducto]));
    cantidadProductoFinal = 1;
  } else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(
      products => products.id === producto.id
    );
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito lo agrego
    if (indiceProducto === -1) {
      
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
       cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("dietetica", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("dietetica"));

    // Encuentra el índice del producto en el carrito
    const indiceProducto = memoria.findIndex(products => products.id === producto.id);

    if (indiceProducto !== -1) {
        // Resta una unidad al producto
        memoria[indiceProducto].cantidad--;

        // Verifica si la cantidad es menor o igual a cero y elimina el producto si es necesario
        if (memoria[indiceProducto].cantidad <= 0) {
            memoria.splice(indiceProducto, 1);
        }

        // Actualiza el carrito en el localStorage
        localStorage.setItem("dietetica", JSON.stringify(memoria));

        // Actualiza la interfaz y el número del carrito
        createTarjetaProductoCarrito();
        actualizarTotales();

        // Devuelve la nueva cantidad del producto
        return Math.max(0, memoria[indiceProducto]?.cantidad || 0);
    }

    // Si el producto no está en el carrito, devuelve 0
    return 0;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("dietetica"));
  if (memoria && memoria.length > 0) {
    cuenta = memoria.reduce(
      (acum, current) => acum + current.cantidad,
      0
    );
    return cuentaCarritoElement.innerText = cuenta;
  } else {
    cuentaCarritoElement.innerText = 0;
  }
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("dietetica");
  actualizarNumeroCarrito();
}

actualizarNumeroCarrito();

