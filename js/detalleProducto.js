const detalleProductos = document.querySelector("#detalle-producto");

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  console.log(productId);
  // Lógica para cargar la información del producto correspondiente
  obtenerProductoPorId(productId).then((producto) => {
    if (producto) {
      // Mostrar la información del producto en la página
      mostrarDetalleProducto(producto);
    } else {
      console.error("Producto no encontrado");
    }
  });
});

function obtenerProductoPorId(productId) {
  // Cargar los productos desde el archivo JSON
  return fetch("../js/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      // Filtrar el producto por su ID
      return productos.find((producto) => producto.id === productId);
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
      return null;
    });
}

function mostrarDetalleProducto(producto) {
  // const detalleProductos = document.getElementById("detalle-productos");
  detalleProductos.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
              <div class="product_img">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
              </div>
              <div class="product_info">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button>Añadir al Carrito</button>
                <button>Comprar Ahora</button>
              </div>
          `;
  detalleProductos.appendChild(div);
}
