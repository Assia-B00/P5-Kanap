fetch("http://localhost:3000/api/products/" + product_id)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (product) { 
        console.log(product)
    })