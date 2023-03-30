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

                // Le nombre total d'articles et le prix total ont été déplacé plus bas dans la fonction get_total_cart


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


// La fonction pour gérer la suppression :
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

    // Si le panier n'est pas vide : afficher les produits du local storage
    // Pour parcourir le panier, on fait une boucle for 
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

                // Le nombre total d'articles et le prix total ont été déplacé plus bas dans la fonction get_total_cart

                // Pour afficher le nombre total d'articles :
                document.getElementById("totalQuantity").innerHTML = cart.length

                // Pour afficher le prix TOTAL du panier : 
                document.getElementById("totalPrice").innerHTML = parseFloat(totalPrice).toFixed(2)


            })

    }
}


// Formulaire : on utilise les expressions régulières

document.getElementById("order").addEventListener("click", function(e){
    e.preventDefault()
   formulaire()
})

/*function formulaire(){
    console.log("formulaire")
}

/*
let form = document.querySelector(".cart__order__form")

// Email 

form.firstName.addEventListener('change', function(){
    validFirstName(this);
})

const validFirstName = function(inputFirstName){
    let firstNameRegExp = new RegExp(^[A-Z]+[A-Za-z\é\è\ê\-]+$)
    let errorFirstName =
}*/

function formulaire(event) {
    const order = document.querySelector("#order")

    let inputFisrtname = document.querySelector("#firstName")
    let errorFirstName = document.querySelector("#firstNameErrorMsg")

    let inputLastname = document.querySelector("#lastName")

    let inputAddress = document.querySelector("#address")

    let inputCity = document.querySelector("#city")

    let inputEmail = document.querySelector("#email")

    console.log(inputFisrtname.value.length)
    if (inputFisrtname.value.length <= 1){
        console.log("ERREUR")
        errorFirstName.innerHTML = "Veuillez entrez un prénom valide"
    }
    return false
}


// Faire les regexp pour chaque champs
// Créer un objet contact avec les données du formulaire et un tableaux produits
// Générer un numéro de commande pour la page confirmation


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