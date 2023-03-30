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

function get_cart() {
    let cart = JSON.parse(localStorage.getItem('cartProduct'));
    // Si le panier est vide : 

    if (cart === null) {
        return
    }

    // Si le panier n'est pas vide : afficher les produits du local storage
    // Pour parcourir le panier, on fait une boucle for 
    for (let i = 0; i < cart.length; i++) {
        fetch("http://localhost:3000/api/products/" + cart[i].id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {

                let totalPrice = 0;
                let article = document.getElementById("cart__items")

                // Pour afficher la balise <article> du code HTML : 
                // <article class="cart__item" data-id="{product-ID}" data-color="{product-color} »>
                let seeCart = document.createElement("article")
                seeCart.classList.add("cart__item")
                seeCart.setAttribute("data-id", product["_id"])
                seeCart.setAttribute("data-color", cart[i]["color"])
                //cart__items.appendChild(seeCart)

                // Pour afficher l'image du produit :
                let div_img = document.createElement("div")
                div_img.classList.add("cart__item__img")

                let img = document.createElement("img")
                img.setAttribute("src", product["imageUrl"])
                img.setAttribute("alt", product["altTxt"])
                div_img.appendChild(img)

                article.appendChild(div_img)

                //Pour afficher la <div class="cart__item__content"> :
                let cart_content = document.createElement("div")
                cart_content.classList.add("cart__item__content")

                //Pour afficher la <div class="cart__item__content__description"> qui contient le nom, la couleur et le prix du produit : 
                let cartDescription = document.createElement("div")
                cartDescription.classList.add("cart__item__content__description")

                // Pour afficher le nom du produit : 
                let h2 = document.createElement("h2")
                h2.innerHTML = product.name;
                cartDescription.appendChild(h2)

                // Pour afficher la couleur du produit : 
                let color = document.createElement("p")
                color.innerHTML = cart[i].color;
                cartDescription.appendChild(color)

                // Pour afficher le prix total du produit :
                let price = document.createElement("p")
                price.innerHTML = parseFloat(product.price).toFixed(2) + " €"; // Pour avoir décimale (2 chiffres après la virgule)

                totalPrice += product.price * cart[i].quantity

                cartDescription.appendChild(price)

                cart_content.appendChild(cartDescription)

                article.appendChild(cart_content)

                // Pour afficher la <div class="cart__item__content__settings">
                let cartChoice = document.createElement("div")
                cartChoice.classList.add("cart__item__content__settings")

                // Pour afficher la quantité : 
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
                //inputQuantity.addEventListener("click", inputQuantity)

                // Pour afficher le bouton supprimer :
                choiceQuantity.appendChild(inputQuantity)
                cartChoice.appendChild(choiceQuantity)

                let btnDelete = document.createElement("div")
                btnDelete.classList.add("cart__item__content__settings__delete")

                let pDelete = document.createElement("p")
                pDelete.classList.add("deleteItem")
                pDelete.innerHTML = "Supprimer"
                btnDelete.appendChild(pDelete)
                //pDelete.addEventListener("click", deleteProduct)

                cartChoice.appendChild(btnDelete)
                cart_content.appendChild(cartChoice)

                // Le nombre total d'articles et le prix total ont été déplacé plus bas dans la fonction get_total_cart

                // Pour afficher le nombre total d'articles :
                document.getElementById("totalQuantity").innerHTML = cart.length

                // Pour afficher le prix TOTAL du panier : 
                document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)


            })

    }
}

// Pour modifier la quantité d'un produit sur la page panier (méthode -> addEventListener de type change) :

let inputQuantity = document.querySelector(".itemQuantity")
for (let j = 0; j < inputQuantity.length; j++) {

    inputQuantity.addEventListener("change", function () {
        let newQuantity = parseInt(this.value)
        let closest = this.closest("[data-id][data-color]")
        const id = closest.getAttribute("data-id")
        const color = closest.getAttribute("data-color")

        if (inputQuantity[j].value !== null && 0 < inputQuantity[j].value && inputQuantity[j].value < 101) {
            console.log(inputQuantity)

        } else {
            alert("Veuillez choisir une quantité entre 1 et 100")
            inputQuantity[j].value = 1
            return
        }

        let cart = JSON.parse(localStorage.getItem('cartProduct'))
        console.log(cart)
        for (let l = 0; l < cart.length; l++) {
            if (
                cart[l].id === id &&
                cart[l].color === color
            ) {
                cart[l].quantity = newQuantity
                localStorage.setItem('cartProduct', JSON.stringify(cart))
                break
            }
        }
    })

}

// Pour supprimer un article sur la page panier :

let deleteProducts = document.querySelectorAll(".deleteItem")
for (let k = 0; k < deleteProducts.length; k++) {

    deleteProducts[k].addEventListener("click", function () {
        let closest = this.closest("[data-id][data-color]")
        const id = closest.getAttribute("data-id")
        const color = closest.getAttribute("data-color")
        closest.remove()
        let cart = JSON.parse(localStorage.getItem('cartProduct'))
        for (let m = 0; m < cart.length; m++) {
            if (
                cart[m].id === id &&
                cart[m].color === color
            ) {
                cart.splice(m, 1)
                localStorage.setItem('cartProduct', JSON.stringify(cart))
                break
            }
        }
    })
}
/*
// La fonction pour gérer la suppression 

function get_total_cart() {

    let totalPrice = 0;    

    // Pour afficher le nombre total d'articles :
    document.getElementById("totalQuantity").innerHTML = cart.length

    // Pour afficher le prix TOTAL du panier : 
    document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)
}



function deleteProduct() {

    let ancestor = this.closest(".cart__item");
    const id = ancestor.getAttribute("data-id");
    const color = ancestor.getAttribute("data-color");
    let cart = JSON.parse(localStorage.getItem('cartProduct'));

    for (let index = 0; index < cart.length; index++) {
        if (
            cart[index].id === id &&
            cart[index].color === color
        ) {
            cart.splice(index, 1);
            localStorage.setItem('cartProduct', JSON.stringify(cart));
            break;
        }
    }

    // Le bloc est enlevé de l'affichage :

    ancestor.remove();

    // Recalcul du total du panier : 

    display_total_cart();

}


// Formulaire : 

/*function formulaire() {
    const order = document.querySelector("#order")

    let inputFisrtname = document.querySelector("#firstName")
    let errorFirstName = document.querySelector("#firstNameErrorMsg")

    let inputLastname = document.querySelector("#lastName")

    let inputAddress = document.querySelector("#address")

    let inputCity = document.querySelector("#city")

    let inputEmail = document.querySelector("#email")


    order.addEventListener("click", (e) => {
        if
            (isNaN(inputFisrtname.value)) {
            errorFirstName.innerText = "Vous devez renseigner un prénom"

        }
    })
}



/*
// Si le formulaire est valide : 
let cart = JSON.parse(localStorage.getItem('cartProduct'));
let commandProduct = []
commandProduct.push(cart)

    localStorage.setItem("firstName",document.querySelector("#firstName").value)
    localStorage.setItem("lastName",document.querySelector("#lastName").value)
    localStorage.setItem("address",document.querySelector("#address").value)
    localStorage.setItem("city",document.querySelector("#city").value)
    localStorage.setItem("email",document.querySelector("#email").value)*/