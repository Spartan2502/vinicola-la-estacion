var nombreP = document.getElementById('nombre');
var precioP = document.getElementById('precio');
var stockP = document.getElementById('stock');
var detalleP = document.getElementById('detalle');
var imagen = document.getElementById('imagen');
var formulario = document.querySelector('#formulario');
var contenido = document.querySelector('#content');

var productos = [];
var usuarios = [];
var products = document.getElementById('products')
var users = document.getElementById('usersIn')
var sales = document.querySelector('#salesIn')
var sell = []
var compras

window.addEventListener('load', () => {

    productos = JSON.parse(localStorage.getItem('products'));
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    sell = JSON.parse(localStorage.getItem('sells'));


    let totalProducts;
    let totalUsers 
    let totalSells;
    let totalX = 0; 

    if(productos == null)totalProducts = 0; else totalProducts = productos.length;
    if(usuarios == null)totalUsers = 0; else totalUsers = usuarios.length;
    if(sell == null)totalSells = 0, sell=[]; else totalSells = sell.length;

    sell.forEach(orders => {
        totalX += orders.total;
    })

    document.getElementById("total1").innerHTML = totalProducts;
    document.getElementById("total2").innerHTML = totalUsers - 1;
    document.getElementById("total3").innerHTML = totalSells;
    document.getElementById("total4").innerHTML = `$ ${totalX}`;


    if (productos == null || productos.length == 0 ) {
        productos = [];
        //console.log("productos.length = 0");
        products.innerHTML = "No hay productos que mostrar";
        //renderData();
    }
    if (usuarios == null) {
        usuarios = [];
        users.innerHTML = "No hay usuarios"
    }
    if (sell == null) {
        sell = [];
        users.innerHTML = "No hay ventas"
    }

    productos.forEach(info => {
        products.innerHTML += `
            <div class="image-block animals" id="card">
            <img src="${info.image}" alt="" />
            <div id="botton">
            <p>ID: ${info.id}</p>
            <h4>${info.name}</h4>
            <h3>$ ${info.price}</h3>
                <h3>Stock ${info.stock}</h3>
                <button id="${info.id}" onclick="removeProduct(${info.id})">Eliminar</button>
            </div>
            </div>`
    })

    usuarios.slice(1).forEach(user => {
        users.innerHTML += `
                <tr>
                <td>${user.name + " " + user.lastName}</td>
                <td>${user.tel}</td>
                <td>${user.email}</td>
                <td>${atob(user.password)}</td>
                <td class="delete"><a onclick='return removeUser("${user.email}")' class="button">Borrar</a></td>
                </tr>`
    });

    /*
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + ' / ' + dd + ' / ' + yyyy; */

    sell.forEach(orders => {
        sales.innerHTML += `
        <tr>
        <td>${orders.user}</td>
        <td>${displaysells(orders.prodcutos)}</td>
        <td>${orders.date}</td>
        <td>$${orders.total}</td>
        <td>
        <select id="status" onchange="orderStatus(${orders.id})">
        <option >${knowstatus(orders.id)}</option>
        <option value="1">Active</option>
    <option value="2">Canceled</option>
    <option value="3">delivered</option>
        </select>
        </td>
        </tr>`
    })
})

/*window.addEventListener('load', ()=> {
    

})*/
const renderData = () => {
    products.innerHTML = "";
    JSON.parse(localStorage.getItem("products")).forEach(info => {
        products.innerHTML += `
    <div class="image-block animals" id="card">
    <img src="${info.image}" alt="" />
    <div id="botton">
    <p>ID: ${info.id}</p>
    <h3>${info.name}</h3>
    <h3>$ ${info.price}</h3>
        <h3>Stock ${info.stock}</h3>
        <button id="${info.id}" onclick="removeProduct(${info.id})">Eliminar</button>
    </div>
    </div>`})
}
const renderUsers = () => {
    users.innerHTML = "";
    JSON.parse(localStorage.getItem("usuarios")).slice(1).forEach(user => {
        users.innerHTML += `
        <tr>
        <td>${user.name + " " + user.lastName}</td>
        <td>${user.tel}</td>
        <td>${user.email}</td>
        <td>${atob(user.password)}</td>
        <td class="delete"><a onclick='return removeUser("${user.email}")' class="button">borrar</a></td>
        </tr>`
    });
}

function obtImg() {

    var file = document.querySelector('input[type=file]').files[0];
    var leer = new FileReader();
    leer.readAsDataURL(file);

    leer.addEventListener('load', () => { localStorage.setItem('imgTemp', leer.result) })
}

function GetId() {
    let uniq = (new Date()).getTime();
    return uniq
}

function agregarProducto() {

    var objeto = {
        id: GetId(),
        name: nombreP.value,
        price: parseInt(precioP.value),
        stock: parseInt(stockP.value),
        description: detalleP.value,
        image: localStorage.getItem('imgTemp')

    }

    localStorage.removeItem('imgTemp');
    productos.push(objeto);

    localStorage.setItem('products', JSON.stringify(productos))
    alert('Se registro ' + nombreP.value)
    console.log(objeto);

    nombreP.value = "";
    precioP.value = "";
    stockP.value = "";
    detalleP.value = "";
    imagen.value = "";
    location.reload()


}
function mostrarFormulario() {

    formulario.style.display = 'block'
    formulario.classList.add('z-index')
    contenido.style.opacity = '50%'

}
function mostrarFormularioUsuario() {
    location.replace('registro.html')

}
function quitarFormulario() {
    formulario.style.display = 'none';
    contenido.style.opacity = '100%'
}

//products
function removeProduct(ID) {
    let productsLS = JSON.parse(localStorage.getItem("products"));

    let found = productsLS.find(x => x.id == ID)

    const index = productsLS.indexOf(found);
    if (index > - 1) {
        productsLS.splice(index, 1);
    }

    localStorage.setItem("products", JSON.stringify(productsLS));

    renderData();
}

function removeUser(mail) {
    let usersLS = JSON.parse(localStorage.getItem("usuarios"));

    let found = usersLS.find(x => x.email == mail)

    const index = usersLS.indexOf(found);
    if (index > - 1) {
        usersLS.splice(index, 1);
    }

    localStorage.setItem("usuarios", JSON.stringify(usersLS));

    renderUsers();
}

//sells
var Sells = JSON.parse(localStorage.getItem('sells'))
function displaysells(Sells) {
    let ids = Sells.map(x => x.id)

    let name = ''
    for (let i = 0; i < ids.length; i++) {
        compra = productos.filter(productos => productos.id === ids[i]);
        name += compra[0].name.substring(0, 40) +" <em>Cantidad:</em> "+ Sells[i].stock + "<br>";
    }

    return name
}

//order status
function orderStatus(order) {
    console.log(order);
    var x = document.getElementById("status");
    let xy = x.value
    let orders = JSON.parse(localStorage.getItem('sells'))
    find
    console.log(xy);

    x.innerHTML += `
    <option value="1">Active</option>
    <option value="2">Canceled</option>
    <option value="3">delivered</option>`

    
}

function knowstatus(id){
    let status = JSON.parse(localStorage.getItem('sells'))
    let know = status.find(x => x.id == id )
    return know.satus
}