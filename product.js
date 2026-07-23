// ===============================
// PRODUCT PAGE
// ===============================

let selectedSize = "";
let quantity = 1;

// Size Selection
document.querySelectorAll(".size-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".size-btn").forEach(btn =>
            btn.classList.remove("selected")
        );

        button.classList.add("selected");

        selectedSize = button.textContent;

    });

});

// Quantity
const quantityDisplay = document.getElementById("quantity");

document.getElementById("plus").addEventListener("click", () => {

    quantity++;

    quantityDisplay.textContent = quantity;

});

document.getElementById("minus").addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityDisplay.textContent = quantity;

    }

});

// Add to Cart
document.getElementById("addCart").addEventListener("click", function (e) {

    e.preventDefault();

    if (selectedSize === "") {

        alert("Please select a size.");

        return;

    }

    addProduct({

        id: products.heritageTee.id,

        name: products.heritageTee.name,

        price: products.heritageTee.price,

        image: products.heritageTee.image,

        size: selectedSize,

        quantity: quantity

    });

    window.location.href = "cart.html";

});