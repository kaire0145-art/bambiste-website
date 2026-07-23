// ===============================
// PRODUCT PAGE
// ===============================

// SIZE SELECTION
const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = "";

sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedSize = button.textContent;
    });
});

// QUANTITY
let quantity = 1;

const quantityDisplay = document.getElementById("quantity");

if (quantityDisplay) {

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

}

// ADD TO CART
const addCartBtn = document.querySelector(".add-cart");

if (addCartBtn) {

    addCartBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (selectedSize === "") {
            alert("Please select a size.");
            return;
        }

        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            size: selectedSize,
            quantity: quantity
        };

        addProduct(product);

        window.location.href = "cart.html";

    });

}
