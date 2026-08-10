// ===============================
// PRODUCT PAGE
// ===============================

// PRODUCT INFORMATION
const productInfo = document.querySelector(".product-info");

// SIZE SELECTION
const sizeButtons = document.querySelectorAll(".size-btn");

let selectedSize = "";

sizeButtons.forEach(button => {

    button.addEventListener("click", function () {

        sizeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedSize = this.textContent.trim();

    });

});


// ===============================
// QUANTITY
// ===============================

let quantity = 1;

const quantityDisplay = document.getElementById("quantity");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");

if (quantityDisplay && plusButton && minusButton) {

    plusButton.addEventListener("click", function () {

        quantity++;

        quantityDisplay.textContent = quantity;

    });

    minusButton.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;

        }

    });

}


// ===============================
// GET PRODUCT DATA
// ===============================

function getProductData() {

    return {

        id: productInfo.dataset.id,

        name: productInfo.dataset.name,

        price: Number(productInfo.dataset.price),

        image: productInfo.dataset.image,

        size: selectedSize,

        quantity: quantity

    };

}


// ===============================
// ADD TO CART
// ===============================

const addCartBtn = document.querySelector(".add-cart");

if (addCartBtn) {

    addCartBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (selectedSize === "") {

            alert("Please select a size.");

            return;

        }

        const product = getProductData();

        addProduct(product);

        window.location.href = "cart.html";

    });

}
// ===============================
// BUY NOW
// ===============================

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {

    buyNowBtn.addEventListener("click", function () {

        // Check size
        if (selectedSize === "") {
            alert("Please select a size.");
            return;
        }

        // Get product information from product-info
        const product = {
            id: productInfo.dataset.id,
            name: productInfo.dataset.name,
            price: Number(productInfo.dataset.price),
            image: productInfo.dataset.image,
            size: selectedSize,
            quantity: quantity
        };

        console.log("BUY NOW PRODUCT:", product);

        // Replace cart with this product
        localStorage.setItem("cart", JSON.stringify([product]));

        // Go to checkout
        window.location.href = "checkout.html";

    });

}

