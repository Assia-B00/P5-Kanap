fetch("http://localhost:3000/api/products")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (products) {        
        for (let product of products) {

        var str ="http://localhost:3000/api/products/"+ product_id;
        var url = new URL (str);
        var product_id = url.searchParams.get("product_id");
        console.log(product_id)

       /* // Call API
        const href = "./product.html?id=" + product["_id"];

        // Article
        let article = document.createElement("article")

        // Image
        let img = document.createElement("img")
        img.setAttribute("src", product["imageUrl"])
        img.setAttribute("alt", product["altTxt"])
        document.classList.add("item__img").appendChild(img)


        // Title
        let h1 = document.createElement("h1")
        h1.getElementById("title")
        h1.innerHTML = product["name"]
        document.classList.add("item__content__titlePrice").appendChild(h1)

        // Price
        let p = document.createElement("p")
        p.getElementById("price")
        p.innerHTML = product["price"]
        document.classList.add("item__content__titlePrice").appendChild(p)

        // Description

        let description = document.createElement("description")
        description.getElementById("description")
        description.innerHTML = product["description"]
        document.classList.add("item__content__description").appendChild(description)

        // Colors

        let option = document.createElement("option")
        option.getElementById("colors")
        option.innerHTML = product["colors"]
        document.getElementById("colors").appendChild(option)

        a.appendChild(article)
        document.getElementById("items").appendChild(a)*/
        }}
    )