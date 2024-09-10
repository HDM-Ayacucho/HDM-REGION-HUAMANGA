const productos = [
    { id: 1, nombre: 'Polo verde', precio: 25.00, imagen: '/tienda/verde.png', categoria: 'polos' },
    { id: 2, nombre: 'Polo amarilla', precio: 35.00, imagen: '/tienda/amarillo.png', categoria: 'polos' },
    { id: 3, nombre: 'Polo roja', precio: 35.00, imagen: '/tienda/rojo.png', categoria: 'polos' },
    { id: 4, nombre: 'Polo azul', precio: 35.00, imagen: '/tienda/azul.png', categoria: 'polos' },
    { id: 5, nombre: 'Polera azul', precio: 35.00, imagen: '/tienda/polera1.png', categoria: 'poleras' },
    { id: 6, nombre: 'Polera roja', precio: 35.00, imagen: '/tienda/polera2.png', categoria: 'poleras' },
    { id: 7, nombre: 'Polera verde', precio: 35.00, imagen: '/tienda/polera3.png', categoria: 'poleras' },
    { id: 8, nombre: 'Polera amarilla', precio: 35.00, imagen: '/tienda/polera4.png', categoria: 'poleras' },
    { id: 9, nombre: 'Gorra cruz ploma', precio: 45.00, imagen: '/tienda/gorra1.jpg', categoria: 'accesorios' },
    { id: 10, nombre: 'Gorra cruz banca', precio: 43.00, imagen: '/tienda/gorra2.jpg', categoria: 'accesorios' },
    { id: 11, nombre: 'Gorra azul roja', precio: 27.00, imagen: '/tienda/gorra3.jpg', categoria: 'accesorios' },
    { id: 12, nombre: 'Gorra chuyo plaa', precio: 15.00, imagen: '/tienda/gorra4.jpg', categoria: 'accesorios' },
    { id: 13, nombre: 'pulsera jesus love', precio: 15.00, imagen: '/tienda/pulseralovejesus.webp', categoria: 'accesorios' },
    { id: 14, nombre: 'pulsera jesus', precio: 15.00, imagen: '/tienda/pulserJesus.webp', categoria: 'accesorios' },
];

const productoGrid = document.getElementById('producto-grid');
const carritoIcono = document.getElementById('carrito');
const carritoCantidad = document.getElementById('carrito-cantidad');
const carritoVentana = document.getElementById('carrito-ventana');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const comprarBtn = document.getElementById('comprar-btn');
const filtrosBtns = document.querySelectorAll('.filtro-btn');

let carrito = [];

function renderizarProductos(productos) {
    productoGrid.innerHTML = '';
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <div class="producto-zoom">
                <a href="${producto.imagen}" data-fancybox="gallery" data-caption="${producto.nombre}">
                    <i class="fas fa-search-plus"></i>
                </a>
            </div>
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
                <div class="item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
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
    carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function comprarPorWhatsApp() {
    const mensaje = carrito.map(item => `${item.nombre} x${item.cantidad} - S/${(item.precio * item.cantidad).toFixed(2)}`).join('\n');
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const telefono = '910109478'; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent('Quiero comprar:\n' + mensaje + '\n\nTotal: S/' + total.toFixed(2))}`;
    window.open(url, '_blank');
}

carritoIcono.addEventListener('click', () => {
    carritoVentana.style.display = 'block';
});

// Agregar botón para cerrar la ventana del carrito
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


renderizarProductos(productos);

// Inicializar Fancybox
Fancybox.bind("[data-fancybox]", {
    // Opciones de Fancybox aquí
});