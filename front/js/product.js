fetch("http://localhost:3000/api/products/" + product_id)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (product) {

        // Image
        let img = document.createElement("img")
        img.setAttribute("src", product["imageUrl"])
        img.setAttribute("alt", product["altTxt"])
        document.getElementsByClassName("item__img")[0].appendChild(img)

        // Title
        document.getElementById("title").innerHTML = product["name"]

        // Price
        document.getElementById("price").innerHTML = product["price"]

        // Description
        document.getElementById("description").innerHTML = product["description"]

        // Colors       
        for (let color of product["colors"]) {
            let option = document.createElement("option")
            option.setAttribute("value", color)
            option.innerHTML = color
            document.getElementById("colors").appendChild(option)
        }
    })

// Bouton ajouter au panier 

const buttonCart = document.querySelector("#addToCart")
buttonCart.addEventListener("click", function () {

    const quantity = document.querySelector("#quantity").value
    const color = document.querySelector("#colors").value

    // Message d'alerte si la couleur et la quantité n'ont pas été renseignées 
    if (!color) {
        alert("Vous devez sélectionner une couleur")
        return
    }
    if (quantity == null || quantity < 1 || quantity > 100) {
        alert("Vous devez choisir une quantité entre 1 et 100")
        return
    }

    // product_id
    addToCart(product_id, color, quantity)
    //infoQuantityColor ()
    popup(color)
})

// Message Popup à l'ajout d'un produit 

const popup = (color) => {
    const name = document.getElementById("title").innerHTML;
    if (window.confirm(`Le ${name} de couleur ${color} a bien été ajouté au panier. Pour consulter le panier cliquez sur "OK". Pour revenir à la liste de produits Kanap cliquez sur "Annuler"`)) {
        window.location.href = "cart.html"
    } else {
        window.location.href = "index.html"
    }
}

