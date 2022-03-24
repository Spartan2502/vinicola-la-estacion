var total = document.getElementById("total")
var content = document.querySelector('.shopping')
var carrito = []
var productos = [];
var totaladd = 0;
var compra;

var moreless = document.querySelector('#buy')
var tobuy = 0
window.addEventListener('load', () => {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    productos = JSON.parse(localStorage.getItem('products'))
    if (productos == null) alert('No hay productos')
    else if (carrito == null) alert('No hay productos en tu carrito, agrega algunos')
    else getcart()

})

function getcart() {
    carrito.forEach(data => {
        compra = productos.find(productos => productos.id === data.id);
        content.innerHTML += `
            <tr>
            <td><img src="${compra.image}" alt="" id="imgcart">${compra.name}</td>
            <td>$ ${compra.price}</td>
            <td><button class="cart-button" onClick="morestock(${data.id},${compra.stock})">+</button><span class="mlandr">${data.stock}</span> <button class="cart-button" onClick="lessstock(${data.id})">-</button></td>
            <td><button class="cart-button del-button" onCLick="del(${data.id})">Borrar</button></td>
            <td id="price">${prices(compra, data)}</td>
        </tr>`

        totaladd += compra.price
    })
    total.innerHTML = totaladd
}
function render() {
    content.innerHTML = ""
    total.innerHTML = ""
    totaladd = 0

    JSON.parse(localStorage.getItem('carrito')).forEach(data => {
        var compra = productos.find(productos => productos.id === data.id);
        content.innerHTML += `
        <tr>
        <td><img src="${compra.image}" alt="" id="imgcart">${compra.name}</td>
        <td>$ ${compra.price}</td>
        <td><button class="cart-button" onClick="morestock(${data.id},${compra.stock})">+</button><span class="mlandr">${data.stock}</span> <button class="cart-button" onClick="lessstock(${data.id})">-</button></td>
        <td><button class="cart-button del-button" onCLick="del(${data.id})">Borrar</button></td>
        <td id="price">${prices(compra, data)}</td>
    </tr>`
        totaladd += compra.price * data.stock
    })
    total.innerHTML = totaladd
}

function prices(compra, data) {
    var cant = data.stock * compra.price
    return cant
}
function morestock(id, stock) {
    let cart = JSON.parse(localStorage.getItem('carrito'));
    let found = cart.find(x => x.id == id)
    const index = cart.indexOf(found)


    if (cart[index].stock < stock) {
        cart[index].stock += 1
        localStorage.setItem('carrito', JSON.stringify(cart))
        render()
    } else {
        alert('Máximo stock disponible')
    }
}
function lessstock(id) {
    let cart = JSON.parse(localStorage.getItem('carrito'));
    let found = cart.find(x => x.id == id)
    const index = cart.indexOf(found)

    if (cart[index].stock > 1) {
        cart[index].stock -= 1
        localStorage.setItem('carrito', JSON.stringify(cart))
        render()
    } else {
        alert('Si quieres eliminar el proucto usa el boton "Eliminar"')
    }

}
function del(id) {
    let delet = JSON.parse(localStorage.getItem('carrito'))
    let found = delet.find(x => x.id == id)
    const index = delet.indexOf(found)
    if (index > - 1) delet.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(delet))
    render()
}
if (localStorage.getItem('sells') == null) {
    localStorage.setItem('sells', '[]')
}


//boton finalizar y pagar
var out = document.querySelector('#check')
out.addEventListener('click', () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + ' / ' + mm + ' / ' + yyyy;

    let sells = JSON.parse(localStorage.getItem('sells'))
    let venta = {
        id: Date.now(),
        user: JSON.parse(sessionStorage.getItem("logged")),
        prodcutos: JSON.parse(localStorage.getItem('carrito')),
        date: today,
        total: totaladd,
        satus: "Active"
    }
    //
    let productosLS = JSON.parse(localStorage.getItem('products'));
    let cantARestar = venta.prodcutos;
    console.log(cantARestar);

    const actualizarProductos = () => {
        for (let i = 0; i < cantARestar.length; i++) {
            productosLS.forEach((x) => {
                if (x.id == cantARestar[i].id) {
                    x.stock -= venta.prodcutos[i].stock
                    console.log(venta.prodcutos[i].stock);
                    console.log(x);
                    console.log(productosLS);
                    localStorage.setItem('products', JSON.stringify(productosLS))

                }
            }) 
        }
    }
    actualizarProductos();
    
    sells.push(venta)
    localStorage.setItem('sells', JSON.stringify(sells))
    localStorage.setItem('carrito', '[]')
    alert("Compra Registrada Correctamente");
    location.href="../orders.html";
})

/*cerrar sesion */
var close = document.getElementById('close')
close.addEventListener('click', () => {
    localStorage.setItem("carrito", "[]");
    sessionStorage.removeItem("logged");

})
const guardarCarros = () => {
    let carrosGuardados = JSON.parse(localStorage.getItem('carrosGuardados'))
    let comprador = JSON.parse(sessionStorage.getItem("logged"));
    let carritoUser = {
        comprador: comprador,
        productos: JSON.parse(localStorage.getItem("carrito"))
    }

    if (carrosGuardados.some(element => element.comprador === comprador)) {
        let cartLS = JSON.parse(localStorage.getItem("carrito"));
        let carritoUser = {
            comprador: comprador,
            productos: [...cartLS]
        }
        let found = carrosGuardados.find(x => x.comprador == comprador)
        const index = carrosGuardados.indexOf(found)
        if (index > - 1) carrosGuardados.splice(index, 1)
        carrosGuardados.push(carritoUser);
        localStorage.setItem("carrosGuardados", JSON.stringify(carrosGuardados))
    } else {
        carrosGuardados.push(carritoUser)
        localStorage.setItem("carrosGuardados", JSON.stringify(carrosGuardados))
    }
}