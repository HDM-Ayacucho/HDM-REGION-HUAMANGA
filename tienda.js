//AGREGAR PRODUCTOS A LA TIENDA

const productos = [
    { id: 1, nombre: 'Historias Bíblicas TOMO 1', precio: 0.00, imagen: '/tienda/tomo1.png', categoria: 'materiales' },
    { id: 2, nombre: 'Historias Bíblicas TOMO 2-6', precio: 9.99, imagen: '/tienda/TOMO2.PNG', categoria: 'materiales' },
    { id: 3, nombre: 'Polera azul', precio: 25.00, imagen: '/tienda/polera1.png', categoria: 'poleras' },
    { id: 4, nombre: 'Polera roja', precio: 25.00, imagen: '/tienda/polera2.png', categoria: 'poleras' },
    { id: 5, nombre: 'Polera verde', precio: 25.00, imagen: '/tienda/polera3.png', categoria: 'poleras' },
    { id: 6, nombre: 'Polera amarilla', precio: 25.00, imagen: '/tienda/polera4.png', categoria: 'poleras' },
    { id: 7, nombre: 'Gorra cruz ploma', precio: 29.99, imagen: '/tienda/gorra1.jpg', categoria: 'accesorios' },
    { id: 8, nombre: 'Gorra cruz blanca', precio: 33.00, imagen: '/tienda/gorra2.jpg', categoria: 'accesorios' },
    { id: 9, nombre: 'Gorra azul roja', precio: 27.99, imagen: '/tienda/gorra3.jpg', categoria: 'accesorios' },
    { id: 10, nombre: 'Gorra chuyo plaa', precio: 24.99, imagen: '/tienda/gorra4.jpg', categoria: 'accesorios' },
    { id: 11, nombre: 'pulsera jesus love', precio: 5.00, imagen: '/tienda/pulseralovejesus.webp', categoria: 'accesorios' },
    { id: 12, nombre: 'pulsera jesus', precio: 5.00, imagen: '/tienda/pulserJesus.webp', categoria: 'accesorios' },
];
//FUNCIONES-...............
const productoGrid = document.getElementById('producto-grid');
const carritoIcono = document.getElementById('carrito');
const carritoCantidad = document.getElementById('carrito-cantidad');
const carritoVentana = document.getElementById('carrito-ventana');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const comprarBtn = document.getElementById('comprar-btn');
const filtrosBtns = document.querySelectorAll('.filtro-btn');

let carrito = [];
//RENDERIZAR PRODUCTOS A LA TIENDA

function renderizarProductos(productos) {
    productoGrid.innerHTML = '';
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>S/${producto.precio.toFixed(2)}</p>
            
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        productoGrid.appendChild(productoElement);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    carritoCantidad.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" width="50">
            <span>${item.nombre}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            <div>
                <button onclick="cambiarCantidad(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <button onclick="eliminarDelCarrito(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        carritoLista.appendChild(li);
        total += item.precio * item.cantidad;
    });
    carritoTotal.textContent = total.toFixed(2);
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            actualizarCarrito();
        }
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    carritoCantidad.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-info">
                <div class="item-name">${item.nombre}</div>
                <div class="item-price">s/${(item.precio * item.cantidad).toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                <span>${item.cantidad}</span>
                <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <button class="remove-item" onclick="eliminarDelCarrito(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        carritoLista.appendChild(li);
        total += item.precio * item.cantidad;
    });
    carritoTotal.textContent = `Total: s/.${total.toFixed(2)}`;
}

function comprarPorWhatsApp() {
    const mensaje = carrito.map(item => `${item.nombre} x${item.cantidad} - S/${(item.precio * item.cantidad).toFixed(2)}`).join('\n');
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const telefono = '+51918862125';
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent('Quiero comprar:\n' + mensaje + '\n\nTotal: S/' + total.toFixed(2))}`;
    window.open(url, '_blank');
}
const cerrarCarritoBtn = document.createElement('button');
cerrarCarritoBtn.innerHTML = '<i class="fas fa-times"></i>';
cerrarCarritoBtn.classList.add('cerrar-carrito');
cerrarCarritoBtn.onclick = () => carritoVentana.style.display = 'none';
carritoVentana.insertBefore(cerrarCarritoBtn, carritoVentana.firstChild);

comprarBtn.addEventListener('click', comprarPorWhatsApp);

filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const categoria = btn.getAttribute('data-categoria');
        filtrosBtns.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        if (categoria === 'todos') {
            renderizarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(p => p.categoria === categoria);
            renderizarProductos(productosFiltrados);
        }
    });
});


carritoIcono.addEventListener('click', () => {
    carritoVentana.style.display = 'block';
});




renderizarProductos(productos);


Fancybox.bind("[data-fancybox]", {

});
