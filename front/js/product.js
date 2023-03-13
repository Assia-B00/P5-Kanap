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
        document.getElementById("title"). innerHTML = product["name"]

        // Price
        document.getElementById("price"). innerHTML = product["price"]

        // Description
        document.getElementById("description"). innerHTML = product["description"]

        // Colors       
        for (let color of product["colors"]){
            console.log(color)
            let option = document.createElement("option")
            option.setAttribute("value", color)
            option.innerHTML = color
            document.getElementById("colors").appendChild(option)
        }
        document.getElementById("items").appendChild(article)
    })