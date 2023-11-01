function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("producto"));
    console.log(memoria)
    if (!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("producto", JSON.stringify([nuevoProducto]));
    } else {
        const indicarProducto = memoria.findIndex(producto => producto.id);
        console.log(indicarProducto);
        if (indicarProducto === -1) {
            const nuevaMemoria = memoria;
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            localStorage.setItem("producto", JSON.stringify(nuevoProducto));
        }
    }
}

function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}