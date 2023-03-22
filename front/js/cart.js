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
    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i]['id'])
        if (cart[i]['id'] == product_id && cart[i]['color'] == color) {
            cart[i]['quantity'] = parseInt(cart[i]['quantity']) + parseInt(quantity)
            to_add = false
            break
        }
    }
    if (to_add) {
        cart.push(data);
    }

    localStorage.setItem('cartProduct', JSON.stringify(cart));
    console.log(cart);
}

// Affichage du panier avec les données des produits dans le tableau
// Parcourir le panier (cart)
// Appel au fetch pour récupréer les données du produit
// Affiche les données

function get_cart(cartProductLocalStorage) {

    // Si le panier est vide : 
    if (cart === null) {
    } else {
        // Si le panier n'est pas vide : afficher les produits du local storage

        fetch("http://localhost:3000/api/products" + cartProductLocalStorage[i]._id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (cart) {
                for (let product in cart) {

                    // Pour séléctionner la class où j'injecte le code HTML
                    //const list = document.querySelector('.cart__item');
                    //console.log("je suis là" + list);

                    // listProduct.innerHTML = '${cart.imageURL} ${cart.name} ${cart.color} ${cart.price}€ ${cart.quantity}';

                    let seeCart = document.createElement("article")

                    let img = document.createElement("img")
                    img.setAttribute("src", product["imageUrl"])
                    img.setAttribute("alt", product["altTxt"])
                    //img.classList.add("cart__item__img")
                    document.getElementsByClassName("cart__item__img")[0].appendChild(img)
                    article.appendChild(img)

                    let h2 = document.createElement("div")
                    h2.classList.add("cart__item__content__description")
                    h2.innerHTML = cart[product].name;
                    article.appendChild(h2)

                    let color = document.createElement("div")
                    color.classList.add("cart__item__content__description")
                    color.innerHTML = cart[product].color;
                    article.appendChild(color)

                    let p = document.createElement("div")
                    p.classList.add("cart__item__content__description")
                    p.innerHTML = cart[product].price;
                    article.appendChild(p)

                    let quantity = document.createElement("input")
                    quantity.classList.add("itemQuantity")
                    quantity.innerHTML = cart[product].quantity;
                    article.appendChild(quantity)
                }
            })

    }
}

// Pour modifier la quantité sur la page : 
function modifQuantity() {
    var inputQuantity = document.getElementsByClassName(".itemQuantity").value
    alert(inputQuantity);
}

// Pour suprimer un article : 
let deleteProducts = document.querySelectorAll(".deleteItem")
for (let j = 0; j < deleteProducts.length; j++) {
    deleteProducts.addEventListener("click");
    let theProductDelete = cart[j]._id;
    cart = cart.filter(products => products._id !== _id);
    localStorage.setItem("cartProduct", JSON.stringify(cart));
}
// Pour afficher le total prix du panier : 
function totalPriceInCart() {
    let total = []

    // Aller chercher les prix dans le panier 
    let productPriceQuantity = document.querySelectorAll("#totalPrice")
    for (let price in productPriceQuantity) {
        total.push(productPriceQuantity[price].innerHTML)
        console.log(total)
    }

    // Pour additionner les prix avec méthode reducer : 
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totPrice = total.reduce(reducer, 0)

}


/* const cart = []
 const  = document.createElement(article);


     let listProduct = document.createElement(article);
     listProduct.innerText = '${product.name} ${product.color} ${product.price}€ ${product.quantity}';
     console.log(product.name)
 }*/


/*let productList = [];
for (let k = 0; k < cart.length; k++) {
    productList = productList + '${product.name} ${product.color} ${product.price}€ ${product.quantity}';
}
})

/*data.article.forEach(article=>{
        const list = document.createElement(li);
        li.innerHTML = "${product.imageUrl} ${product.name} ${product.price}" ;
    })


/*for (let product in cart) {
    let productImg = document.createElement("img")
    productImg.setAttribute("src", product["imageUrl"])
    productImg.setAttribute("alt", product["altTxt"])
    document.getElementsByClassName("cart__item__img")[0].appendChild(img)
}
console.log(product)
/*
    // Image
    let img = document.createElement("img")
    img.setAttribute("src", product["imageUrl"]) // fetch
    img.setAttribute("alt", product["altTxt"]) // fecth
    document.getElementsByClassName("cart__item__img")[0].appendChild(img)

    // Title
    document.getElementById("title").innerHTML = product["name"] //fetch

    // Price
    document.getElementById("price").innerHTML = product["price"] // fetch

    // Description
    document.getElementById("description").innerHTML = product["description"] //fetch

    // Colors fetch
    // quantité qui viens de cart

    for (let color of product["colors"]) {
        console.log(color)
        let option = document.createElement("option")
        option.setAttribute("value", color)
        option.innerHTML = color
        document.getElementById("colors").appendChild(option)
    }
}*/