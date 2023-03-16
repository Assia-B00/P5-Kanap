function addToCart(product_id, color, quantity) {
    let data = { "id": product_id, "color": color, "quantity": quantity }
    let cart = JSON.parse(localStorage.getItem('cartProduct'));
    //let cart = [];
    if (!cart) {
        cart = [];
        cart.push(data);
        localStorage.setItem('cartProduct', JSON.stringify(cart));
        console.log("INIT CART")
        return
    }

    // S'il y a dèjà des produits enregistrés dans le localstorage
    let to_add = true
    console.log(cart)
    for (let i = 0 ; i <  cart.length ; i ++) {
        console.log(cart[i]['id'])
        if (cart[i]['id'] == product_id && cart[i]['color'] == color) {
            cart[i]['quantity'] = parseInt(cart[i]['quantity']) + parseInt(quantity)
            to_add = false
            break
        }         
    }
    if(to_add){
        cart.push(data);        
    }

    localStorage.setItem('cartProduct', JSON.stringify(cart));
    console.log(cart)
}

/*function get_cart() {
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
}*/