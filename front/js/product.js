fetch("http://localhost:3000/api/products/" + product_id)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (product) {
        console.log(product)

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
            console.log(color)
            let option = document.createElement("option")
            option.setAttribute("value", color)
            option.innerHTML = color
            document.getElementById("colors").appendChild(option)
        }
    })

// Bouton ajouter au panier 

const buttonCart = document.querySelector("#addToCart")
buttonCart.addEventListener("click", function () {
    //TODO: Vérifier les données (quantié et couleur) 
    const quantity = document.querySelector("#quantity").value
    const color = document.querySelector("#colors").value
    const price = document.querySelector("#price").value
    // product_id
    addToCart(product_id, color, quantity)
    popup()
})

// Message Popup à l'ajout d'un produit 

const popup = () => {
    if (window.confirm('${name} couleur : ${color} a bien été ajouté au panier. Pour consulter le panier cliquez sur "OK". Pour revenir à la liste de produits Kanap cliquez sur "Annuler"')) {
        window.location.href = "cart.html"
    } else {
        window.location.href = "index.html"
    }
}

