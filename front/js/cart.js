//const addToCart = document.querySelector("#addToCart")

// On déclare la variable dans laquelle on met les key et les value du localstorage
let cart = localStorage.getItem('cartProduct');
console.log(cart)

// S'il y a dèjà des produits enregistrés dans le localstorage
if (cart) {
    cart.push(addToCart);
    localStorage.setItem('cartProduct', (cart));
}
// S'il n'y a pas de produits enregistrés dans le localstorage
else {
    cart = [];
    cart.push(addToCart);
    localStorage.setItem('cartProduct', (cart));
    console.log(cart)
}


function get_cart() {
    let cart = localStorage.getItem('cart');
    console.log(cart)
}

// Affichage du panier avec les données des produits dans le tableau

for (let product in cart) {

    // Image
    let img = document.createElement("img")
    img.setAttribute("src", product["imageUrl"])
    img.setAttribute("alt", product["altTxt"])
    document.getElementsByClassName("cart__item__img")[0].appendChild(img)

    // Title
    document.getElementById("title").innerHTML = product["name"]

    // Price
    document.getElementById("price").innerHTML = product["price"]

    // Description
    document.getElementById("description").innerHTML = product["description"]

    // Colors       
    for (let color of product["colors"]) {
        console.log(color)
        let option = document.createElement("option")
        option.setAttribute("value", color)
        option.innerHTML = color
        document.getElementById("colors").appendChild(option)
    }
}