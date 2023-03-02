fetch("http://localhost:3000/api/products")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (products) {        
        for (let product of products) {
            // Call API
            const href = "./product.html?id=" + product["_id"];

            // anchor
            let a = document.createElement("a");
            a.setAttribute("href", href)

            // Article
            let article = document.createElement("article")

            // image
            let img = document.createElement("img")
            img.setAttribute("src", product["imageUrl"])
            img.setAttribute("alt", product["altTxt"])
            article.appendChild(img)
                    
            // Title
            let h3 = document.createElement("h3")
            h3.classList.add("productName")
            h3.innerHTML = product["name"]
            article.appendChild(h3)

            // Description
            let p = document.createElement ("p")
            p.classList.add("productDescription")
            p.innerHTML = product["description"]
            article.appendChild(p)

            a.appendChild(article)
            document.getElementById("items").appendChild(a)
        }

    })


