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

function get_cart() {
    let cart = JSON.parse(localStorage.getItem('cartProduct'));
    // Si le panier est vide : 

    if (cart === null) {
        return
    }

    // Si le panier n'est pas vide : afficher les produits du local storage
    // Pour parcourir le panier, on fait une boucle for 
    for (let i = 0; i < cart.length; i++) {
        fetch("http://localhost:3000/api/products/" + cart[i].id) // Ne pas confondre localstorage et base de données
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {
                
                    let totalPrice = 0;
                    let article = document.getElementById("cart__items")

                    // Pour séléctionner la class où j'injecte le code HTML
                    //const list = document.querySelector('.cart__item');
                    //console.log("je suis là" + list);

                    // listProduct.innerHTML = '${cart.imageURL} ${cart.name} ${cart.color} ${cart.price}€ ${cart.quantity}';

                    /*
                    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                    */
                    let seeCart = document.createElement("article")
                    seeCart.classList.add("cart__item")
                    seeCart.setAttribute("data-id", product["_id"])
                    seeCart.setAttribute("data-color", cart[i]["color"])

                    /*                       
                        <div class="cart__item__img">
                            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                        </div>
                    */
                    let div_img = document.createElement("div")
                    div_img.classList.add("cart__item__img")

                    let img = document.createElement("img")
                    img.setAttribute("src", product["imageUrl"])
                    img.setAttribute("alt", product["altTxt"])
                    div_img.appendChild(img)
                                       
                    article.appendChild(div_img)

                    /*
                    <div class="cart__item__content">
                    */
                    let cart_content = document.createElement("div")
                    cart_content.classList.add("cart__item__content")

                    /*
                    <div class="cart__item__content__description">
                        <h2>Nom du produit</h2>
                        <p>Vert</p>
                        <p>42,00 €</p>
                    </div>
                    */
                    let cartDescription = document.createElement("div")
                    cartDescription.classList.add("cart__item__content__description")

                    let h2 = document.createElement("h2")
                    h2.innerHTML = product.name;
                    cartDescription.appendChild(h2)

                    let color = document.createElement("p")
                    color.innerHTML = cart[i].color;
                    cartDescription.appendChild(color)

                    let price = document.createElement("p")
                    price.innerHTML = parseFloat(product.price).toFixed(2) + " €"; // Pour avoir décimale (2choiffres après la virgule)
                    
                    totalPrice += product.price * cart[i].quantity

                    cartDescription.appendChild(price)

                    cart_content.appendChild(cartDescription)

                    article.appendChild(cart_content)
                    /*
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    */
                    let cartChoice = document.createElement("div")
                    cartChoice.classList.add("cart__item__content__settings")

                    let choiceQuantity = document.createElement("div")
                    choiceQuantity.classList.add('cart__item__content__settings__quantity')

                    let p = document.createElement("p")
                    p.innerHTML = "Qté :"
                    choiceQuantity.appendChild(p)

                    let inputQuantity = document.createElement("input")
                    inputQuantity.setAttribute("type", "number")
                    inputQuantity.setAttribute("name", "itemQuantity")
                    inputQuantity.setAttribute("min", "1")
                    inputQuantity.setAttribute("max", "100")
                    inputQuantity.setAttribute("value", cart[i].quantity)
                    inputQuantity.classList.add("itemQuantity")

                    choiceQuantity.appendChild(inputQuantity)
                    cartChoice.appendChild(choiceQuantity)

                    let btnDelete = document.createElement("div")
                    btnDelete.classList.add("cart__item__content__settings__delete")

                    let pDelete = document.createElement("p")
                    pDelete.classList.add("deleteItem")
                    pDelete.innerHTML = "Supprimer"
                    btnDelete.appendChild(pDelete)
                    
                    cartChoice.appendChild(btnDelete)
                    cart_content.appendChild(cartChoice)

                    // Ajout du prix total
                    /*
                    <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
                    */
                   document.getElementById("totalQuantity").innerHTML = cart.length
                   document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)

                
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