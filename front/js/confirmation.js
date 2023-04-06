const url = new URL(document.location);
const orderId = url.searchParams.get("orderId");
let orderIdNumero = document.getElementById("orderId")
orderIdNumero.innerHTML = orderId

