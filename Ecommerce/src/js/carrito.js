function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("dietetica"));
    console.log(memoria);
    if (!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("dietetica", JSON.stringify([nuevoProducto]));
    } else {
        const indiceProducto = memoria.findIndex(product => product.id === producto.id);
        console.log(indiceProducto);
        if (indiceProducto === -1) {
            const nuevaMemoria = [...memoria]; // Hacer una copia del arreglo existente
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            localStorage.setItem("dietetica", JSON.stringify(nuevaMemoria));
        } else {
            memoria[indiceProducto].cantidad++;
            localStorage.setItem("dietetica", JSON.stringify(memoria));
        }
    }
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
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta; 
}

actualizarNumeroCarrito();