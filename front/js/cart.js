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

                const section = document.querySelector("#cart__items")

                // Pour afficher la balise <article> du code HTML : 
                let seeCart = document.createElement("article")
                seeCart.classList.add("cart__item")
                seeCart.setAttribute("data-id", product["_id"])
                seeCart.setAttribute("data-color", cart[i]["color"])
                section.appendChild(seeCart)

                // Pour afficher l'image du produit :
                let div_img = document.createElement("div")
                div_img.classList.add("cart__item__img")

                let img = document.createElement("img")
                img.setAttribute("src", product["imageUrl"])
                img.setAttribute("alt", product["altTxt"])
                div_img.appendChild(img)

                seeCart.appendChild(div_img)

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

                cartDescription.appendChild(price)

                cart_content.appendChild(cartDescription)

                seeCart.appendChild(cart_content)

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
                inputQuantity.addEventListener("click", modifyQuantity)

                // Pour afficher le bouton supprimer :
                choiceQuantity.appendChild(inputQuantity)
                cartChoice.appendChild(choiceQuantity)

                let btnDelete = document.createElement("div")
                btnDelete.classList.add("cart__item__content__settings__delete")

                let pDelete = document.createElement("p")
                pDelete.classList.add("deleteItem")
                pDelete.innerHTML = "Supprimer"
                btnDelete.appendChild(pDelete)
                pDelete.addEventListener("click", deleteProduct)

                cartChoice.appendChild(btnDelete)
                cart_content.appendChild(cartChoice)

                // Le nombre total d'articles et le prix total ont été déplacé plus bas dans la fonction display_total_cart ()

            })
    }
    display_total_cart()
}

// Pour modifier la quantité d'un produit sur la page panier (méthode -> addEventListener de type change) :

function modifyQuantity() {
    console.log("modifyQuantity")
    console.log(this.value)

    let newQuantity = parseInt(this.value)
    let ancestor = this.closest(".cart__item");
    const id = ancestor.getAttribute("data-id");
    const color = ancestor.getAttribute("data-color");
    let cart = JSON.parse(localStorage.getItem('cartProduct'));

    for (let index = 0; index < cart.length; index++) {
        if (
            cart[index].id === id &&
            cart[index].color === color
        ) {
            cart[index].quantity = newQuantity
            localStorage.setItem('cartProduct', JSON.stringify(cart));
            break;
        }
    }
    display_total_cart()

}


// La fonction pour gérer la suppression d'un article :

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

function display_total_cart() {
    let cart = JSON.parse(localStorage.getItem('cartProduct'));
    // Si le panier est vide : 

    if (cart === null) {
        return
    }

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        fetch("http://localhost:3000/api/products/" + cart[i].id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {

                totalPrice += product.price * cart[i].quantity

                // Pour afficher le nombre total d'articles :
                document.getElementById("totalQuantity").innerHTML = cart.length

                // Pour afficher le prix TOTAL du panier : 
                document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)


            })

    }
}


// Formulaire : on utilise les expressions régulières

document.getElementById("order").addEventListener("click", function (e) {
    e.preventDefault()
    formulaire()
})

function formulaire(event) {
    const order = document.querySelector("#order")

    let inputFirstname = document.querySelector("#firstName")
    let errorFirstName = document.querySelector("#firstNameErrorMsg")

    let inputLastname = document.querySelector("#lastName")
    let errorLastName = document.querySelector("#lastNameErrorMsg")

    let inputAddress = document.querySelector("#address")
    let errorAddress = document.querySelector("#addressErrorMsg")

    let inputCity = document.querySelector("#city")
    let errorCity = document.querySelector("#cityErrorMsg")

    let inputEmail = document.querySelector("#email")
    let errorEmail = document.querySelector("#emailErrorMsg")

    // Message d'erreur Fristname

    console.log(inputFirstname.value.length)
    if (inputFirstname.value.length <= 1) {
        console.log("ERREURfirstname")
        errorFirstName.innerHTML = "Veuillez entrer un prénom valide"
    }

    // Message d'erreur Lastname

    console.log(inputLastname.value.length)
    if (inputLastname.value.length <= 1) {
        console.log("ERREURlastname")
        errorLastName.innerHTML = "Veuillez entrer un nom valide"
    }

    // Message d'erreur Address

    console.log(inputAddress.value.length)
    if (inputAddress.value.length <= 1) {
        console.log("ERREURaddress")
        errorAddress.innerHTML = "Veuillez entrer une adresse valide"
    }

    // Message d'erreur City

    console.log(inputCity.value.length)
    if (inputCity.value.length <= 1) {
        console.log("ERREURcity")
        errorCity.innerHTML = "Veuillez entrer une ville valide"
    }

    // Message d'erreur Email

    console.log(inputEmail.value.length)
    if (inputEmail.value.length <= 1) {
        console.log("ERREURemail")
        errorEmail.innerHTML = "Veuillez entrez un email valide"
    }
    return false
}
/*
// Création des RegExp pour chaque champs : 

const firstNameRegExp = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/
let firstName
console.log(firstNameRegExp)

const lastNameRegExp = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/
console.log(lastNameRegExp)
let lastName

const addressRegExp = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/
console.log(addressRegExp)
let address

const cityRegExp = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/
console.log(cityRegExp)
let city

const emailRegExp = '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
console.log(emailRegExp)
let email
*/

// Pour le firstname : 

function verifRegExp() {

    let inputFirstname = document.querySelector("#firstName")
    let errorFirstName = document.querySelector("#firstNameErrorMsg")

    // Code de Pierre : 

    const firstNameRegExp = new RegExp('^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$', 'g')
    if (firstNameRegExp.test(firstName.value) === false) {
        errorFirstName.innerHTML = "Veuillez entrer des lettres pour renseigner le prénom"
        console.log(firstNameRegExp)
    }

   /* inputFirstname.addEventListener("change", function (e) {
        firstName = e.target.value
        if (!firstNameRegExp.test(firstName.value) === true) {
            errorFirstName = "Veuillez entrer des lettres pour renseigner le prénom"
            return
        }
        console.log(inputFirstname)
    })*/
}






// Créer un objet contact à partir des données du formulaire et un tableau de produits : 

let commandProducts = document.getElementById("order")
commandProducts.addEventListener("click", function (e) {
    e.preventDefault()

    // Stocker les id des produits du panier dans un tableau products : 

    const idCommand = document.querySelectorAll(".cart__item")

    let products = []

    for (let i = 0; i < idCommand.length; i++) {
        const productIdCommand = idCommand[i].getAttribute("data-id")
        products.push(productIdCommand)
    }
    console.log(commandProducts)

    // Stocker les informations du formulaire : 

    // dataFormulaire

    // Poster les données dans l'API : 

    const toSend = { products }
    console.log(toSend)

    let sendCommandToApi = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(toSend),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }

    })

    // Génération d'un orderID retourné par l'API et renvoie vers la page de confirmation :

    sendCommandToApi.then(async (response) => {
        try {
            console.log(response)
            const contenu = await response.json()
            // window.location.href = "./confirmation.html?orderId=" + contenu.orderID
        } catch (e) {
        }
    })
    orderIDconfirm()
})








// Reste à faire : 

    // Faire les regexp pour chaque champs pour lundi (validation)
    // Créer un objet contact avec les données du formulaire et un tableaux produits
    // Générer un numéro de commande pour la page confirmation
    // product.html : Lorsque l’on ajoute un article au panier il faudrait un message qui indique que l’on vient d’ajouter un article au panier