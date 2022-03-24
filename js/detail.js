var product = document.querySelector('.products')
var products = []
let contenedor = document.querySelector(".info-container");

const regresar = () => {
    location.href = "../products.html";
}

addEventListener('load', ()=>{
products = JSON.parse(localStorage.getItem('products'))
detail = JSON.parse(localStorage.getItem('detail'))

var find = products.find(x =>x.id == detail)

    contenedor.innerHTML = `
    <div class="text-container">
            <h2 class="color-text">${find.name}</h2>
            <p>
            ${find.description}
            </p>
            <p class="price-text">$ ${find.price}</p>
            <div class="button-wrapper">
            <button class="add-to-cart" onClick="addToCart(${find.id})">Comprar</button>
            
            <button class="add-to-cart2" onclick="regresar()">Regresar</button>
            </div>
        </div>
        <div class="wrapper">
        <img class="imagensita" width="300px" src="${find.image}" alt="">
        </div>
        `;

    let img = document.querySelector(".imagensita");
    img.addEventListener('load', function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches()
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                console.log("si")
            }
        }
        let vibrante = vibrant.VibrantSwatch.getHex();

        console.log(vibrant);
        console.log(vibrante);
        document.querySelector(".wrapper").style.background = vibrante;
        document.querySelector(".add-to-cart").style.background = vibrante;
        let vibranteLigero = vibrant.LightVibrantSwatch.getHex();
        document.querySelector("header").style.background = vibranteLigero;

    });
    
})



function see(){
    if (localStorage.getItem('carrito') == null) {
        localStorage.setItem('carrito', '[]')
        console.log('No existe')
    }
}
function addToCart(id){
    var cart = {
        id: id,
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