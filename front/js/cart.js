function addToCart(product_id, color, quantity) {
    let data = { "id": product_id, "color": color, "quantity": quantity }
    let cart = JSON.parse(localStorage.getItem('cartProduct'));

    // S'il n'y a pas des produits déjà présents dans le localstorage 

    if (!cart) {
        cart = [];
        cart.push(data);
        localStorage.setItem('cartProduct', JSON.stringify(cart));
        return
    }

    // S'il y a dèjà des produits enregistrés dans le localstorage
    let to_add = true
    for (const element of cart) {
        if (element['id'] == product_id && element['color'] == color) {
            element['quantity'] = parseInt(element['quantity']) + parseInt(quantity)
            to_add = false
            break
        }
    }
    if (to_add) {
        cart.push(data);
    }

    localStorage.setItem('cartProduct', JSON.stringify(cart));
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

    for (const element of cart) {
        fetch("http://localhost:3000/api/products/" + element.id)
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
                seeCart.setAttribute("data-color", element["color"])
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
                color.innerHTML = element.color;
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
                inputQuantity.setAttribute("value", element.quantity)
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

    let newQuantity = parseInt(this.value)
    let ancestor = this.closest(".cart__item");
    const id = ancestor.getAttribute("data-id");
    const color = ancestor.getAttribute("data-color");
    let cart = JSON.parse(localStorage.getItem('cartProduct'));

    for (const element of cart) {
        if (
            element.id === id &&
            element.color === color
        ) {
            element.quantity = newQuantity
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
    let totalQuantity = 0;
    for (const element of cart) {
        fetch("http://localhost:3000/api/products/" + element.id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {

                totalPrice += product.price * element.quantity;
                totalQuantity += parseInt(element.quantity);
                // Pour afficher le nombre total d'articles :
                document.getElementById("totalQuantity").innerHTML = totalQuantity

                // Pour afficher le prix TOTAL du panier : 
                document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)


            })

    }
}


// Formulaire : on utilise les expressions régulières

function formulaire(event) {

    let valid = true
    //const order = document.querySelector("#order")

    const nameRegExp = new RegExp('^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ -]+$')
    const addressRegExp = new RegExp(/^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ ,.\s-]+$/)
    const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')

    let inputFirstname = document.querySelector("#firstName")
    let errorFirstName = document.querySelector("#firstNameErrorMsg")
    errorFirstName.innerHTML = "";

    let inputLastname = document.querySelector("#lastName")
    let errorLastName = document.querySelector("#lastNameErrorMsg")
    errorLastName.innerHTML = "";

    let inputAddress = document.querySelector("#address")
    let errorAddress = document.querySelector("#addressErrorMsg")
    errorAddress.innerHTML = "";

    let inputCity = document.querySelector("#city")
    let errorCity = document.querySelector("#cityErrorMsg")
    errorCity.innerHTML = "";

    let inputEmail = document.querySelector("#email")
    let errorEmail = document.querySelector("#emailErrorMsg")
    errorEmail.innerHTML = "";

    // Message d'erreur Fristname

    if (inputFirstname.value.length <= 1) {
        errorFirstName.innerHTML = "Veuillez entrer un prénom valide"
        valid = false
    }

    if (nameRegExp.test(firstName.value) === false) {
        errorFirstName.innerHTML = "Veuillez entrer des lettres pour renseigner le prénom"
        valid = false
    }

    // Message d'erreur Lastname

    if (inputLastname.value.length <= 1) {
        errorLastName.innerHTML = "Veuillez entrer un nom valide"
        valid = false
    }

    if (nameRegExp.test(lastName.value) === false) {
        errorLastName.innerHTML = "Veuillez entrer des lettres pour renseigner le nom"
        valid = false
    }

    // Message d'erreur Address

    if (inputAddress.value.length <= 1) {
        errorAddress.innerHTML = "Veuillez entrer une adresse valide"
        valid = false
    }

    if (addressRegExp.test(address.value) === false) {
        errorAddress.innerHTML = "Adresse non validée"
        valid = false
    }

    // Message d'erreur City

    if (inputCity.value.length <= 1) {
        errorCity.innerHTML = "Veuillez entrer une ville valide"
        valid = false
    }

    if (nameRegExp.test(city.value) === false) {
        errorCity.innerHTML = "Veuillez entrer une ville connue"
        valid = false
    }

    // Message d'erreur Email

    if (inputEmail.value.length <= 1) {
        errorEmail.innerHTML = "Veuillez entrez un email valide"
        valid = false
    }

    if (emailRegExp.test(email.value) === false) {
        errorEmail.innerHTML = "L'adresse mail est incorrecte"
        valid = false
    }

    return valid
}

// Créer un objet contact à partir des données du formulaire et un tableau de produits : 

function validCommand() {

    let commandProducts = document.getElementById("order")
    commandProducts.addEventListener("click", function (e) {
        e.preventDefault()

        if (!formulaire()) {
            return false;
        }

        // Stocker les id des produits du panier et les données du formulaire dans un tableau products : 

        const idCommand = document.querySelectorAll(".cart__item")

        let products = []

        for (const element of idCommand) {
            const productIdCommand = element.getAttribute("data-id")
            products.push(productIdCommand)
        }

        const toSend = {
            "contact": {
                "firstName": document.querySelector("#firstName").value,
                "lastName": document.querySelector("#lastName").value,
                "address": document.querySelector("#address").value,
                "city": document.querySelector("#city").value,
                "email": document.querySelector("#email").value
            },
            "products": products
        }

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
                const contenu = await response.json()
                window.location.href = "./confirmation.html?orderId=" + contenu.orderId + "#orderId"
            } catch (e) {
            }
        })

        // Pour vider le panier après validation du panier 

        localStorage.clear(products)

    })
}
