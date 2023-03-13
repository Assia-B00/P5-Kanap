function add_to_cart(id, quantity, color){
    let cart = localStorage.getItem('cart');
    if(cart == null){
        cart = []
    }
    // Vérifier si le produits n'est pas déjà dans le panier 
    // Si le produit existe déjà ajouter la quantité
    let product_id = id + color
    cart[product_id] = quantity  
    localStorage.setItem('cart', cart);
    console.log(cart)
}

function get_cart(){
    let cart = localStorage.getItem('cart');
    console.log(cart)   
}