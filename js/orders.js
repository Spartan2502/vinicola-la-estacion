var show = document.querySelector(".show")

addEventListener('load', () => {
    var session = JSON.parse(sessionStorage.getItem('logged'));
    var sells = JSON.parse(localStorage.getItem('sells'))
    var products = JSON.parse(localStorage.getItem('products'))
    var count = sells.filter(user => user.user == session)
    //
    count.forEach((value, index, array) => {
        var date = value.date
        value.prodcutos.forEach((value, index, array) => {
            var find = products.find(product => product.id == value.id)
            show.innerHTML += `
        <tr>
            <td><img src="${find.image}" alt="${find.name}"></td>
            <td>${find.name} </td>
            <td>${date}</td>
            <td>${find.price}</td>
        </tr>
        `
        })
        show.innerHTML += `
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Total: ${value.total}</td>
    </tr>
    <hr>`
    })
})
