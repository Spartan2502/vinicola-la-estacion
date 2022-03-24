var cuerpo = document.querySelector('.cards')
var productos = [];
var user = document.getElementById("name")

if (!localStorage.getItem("carrosGuardados")) {
    localStorage.setItem("carrosGuardados", "[]");
}


function mostrarDatos() {
    JSON.parse(localStorage.getItem("products")).slice().reverse().forEach(info => {

        cuerpo.innerHTML += `<div class="card animals">
        <img class="card-img" src="${info.image}" onClick="see(${info.id})" alt="" >
        <p>${info.name}</p>
        <p>$${info.price}</p>
        <button class="add-to-cart" id="buy" onClick="buy(${info.id}) " >Agregar al carrito</button>
    </div>`
    })
}

window.addEventListener('load', () => {

    var userL=JSON.parse(localStorage.getItem('carrosGuardados'))
    var usuarioA=JSON.parse(sessionStorage.getItem('logged'))

    let encontrado = userL.find(x => x.comprador == usuarioA);
    let indice = userL.indexOf(encontrado);

   if (encontrado){
       localStorage.setItem('carrito', JSON.stringify(userL[indice].productos))
       console.log(userL)
   } else {
       console.log("no se encontró");
   }
    

    if (localStorage.getItem('carrito') == null) {
        localStorage.setItem('carrito', '[]')
        console.log('No existe')
    }

    
    let productosLS = JSON.parse(localStorage.getItem('products'))
    let carritoLS = JSON.parse(localStorage.getItem('carrito'));
    user.innerHTML = UsName()

    if (productosLS == null) {
        alert('No hay productos que mostrar')
    }
    else {
        mostrarDatos();
    }

    if (carritoLS == null) {
        carrito = [];
    }
    document.getElementById("xyz").innerHTML = `
        <img src="./img/icons/shopping-cart.png" width="30px" alt="">
                <span class="span"> ${JSON.parse(localStorage.getItem("carrito")).length} </span>
        `;
})

// prueba compra carrito
function buy(producto) {
    var cart = {
        id: producto,
        stock: 1
    }

    let carritols = JSON.parse(localStorage.getItem('carrito'))
    let founded = carritols.find(x => x.id == cart.id)
    if (founded == null) {
        carritols.push(cart);
        localStorage.setItem('carrito', JSON.stringify(carritols))
        document.getElementById("xyz").innerHTML = `
        <img src="./img/icons/shopping-cart.png" width="30px" alt="">
                <span class="span"> ${JSON.parse(localStorage.getItem("carrito")).length} </span>
        `;
    } else {
        alert('El producto ya está en el carrito, añade más desde ahí');
    }
}


/*cerrar sesion */
var close = document.getElementById('close')
    close.addEventListener('click', () => {
    localStorage.setItem("carrito", "[]");
    sessionStorage.removeItem("logged");
})

const guardarCarros = () => {
    let carrosGuardados=JSON.parse(localStorage.getItem('carrosGuardados'))
    let comprador = JSON.parse(sessionStorage.getItem("logged"));
    let carritoUser = {
        comprador: comprador,
        productos: JSON.parse(localStorage.getItem("carrito"))
    }

    if ( carrosGuardados.some(element => element.comprador === comprador )) {
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

function UsName(){
    let username
    users = JSON.parse(localStorage.getItem('usuarios'))
    names = JSON.parse(sessionStorage.getItem('logged'))
    username = users.find(users => users.email === names);
    return `: ${username.name}`
}
function see(id){
        localStorage.setItem('detail', JSON.stringify(id))
    location.href = '../detail.html'
}