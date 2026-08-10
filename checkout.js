// ===============================
// CHECKOUT
// ===============================

// Load cart
const checkoutCart =
    JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems =
    document.getElementById("checkout-items");

const subtotalElement =
    document.getElementById("checkout-subtotal");

const totalElement =
    document.getElementById("checkout-total");


// ===============================
// DISPLAY ORDER
// ===============================

function displayCheckout() {

    if (!checkoutItems || !totalElement) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;


    // Empty cart
    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        if (subtotalElement) {
            subtotalElement.textContent = "0.00";
        }

        totalElement.textContent = "0.00";

        return;
    }


    // Display products
    checkoutCart.forEach(item => {

        const price = Number(item.price) || 0;

        const quantity = Number(item.quantity) || 1;

        const itemTotal = price * quantity;

        total += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="checkout-info">

                    <h3>${item.name}</h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>

                <strong>
                    £${itemTotal.toFixed(2)}
                </strong>

            </div>

        `;

    });


    // Show totals
    if (subtotalElement) {
        subtotalElement.textContent =
            total.toFixed(2);
    }

    totalElement.textContent =
        total.toFixed(2);

}


displayCheckout();


// ===============================
// PAYMENT METHOD
// ===============================

const paymentMethods =
    document.querySelectorAll(".payment-option");

paymentMethods.forEach(method => {

    method.addEventListener("click", function () {

        paymentMethods.forEach(m => {
            m.classList.remove("selected");
        });

        this.classList.add("selected");

    });

});


// ===============================
// COMPLETE ORDER
// ===============================

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            console.log("Checkout form submitted");


            // ===============================
            // CHECK CART
            // ===============================

            if (checkoutCart.length === 0) {

                alert("Your cart is empty.");

                return;
            }


            // ===============================
            // CHECK FORM
            // ===============================

            if (!checkoutForm.checkValidity()) {

                checkoutForm.reportValidity();

                return;
            }


            // ===============================
            // PAYMENT METHOD
            // ===============================

            const selectedPayment =
                document.querySelector(
                    ".payment-option.selected"
                );


            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            // ===============================
            // GET FORM VALUES
            // ===============================

            const inputs =
                checkoutForm.querySelectorAll(
                    "input, select"
                );


            const customer = {

                name: inputs[0].value.trim(),

                email: inputs[1].value.trim(),

                phone: inputs[2].value.trim(),

                address: inputs[3].value.trim(),

                city: inputs[4].value.trim(),

                postcode: inputs[5].value.trim(),

                country: inputs[6].value

            };


            // ===============================
            // CALCULATE TOTAL
            // ===============================

            let finalTotal = 0;

            checkoutCart.forEach(item => {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                finalTotal +=
                    price * quantity;

            });


            // ===============================
            // CREATE ORDER
            // ===============================

            const order = {

                customer: customer,

                items: checkoutCart,

                total: finalTotal,

                paymentMethod:
                    selectedPayment.dataset.payment ||
                    "card",

                date:
                    new Date().toISOString()

            };


            // ===============================
            // SAVE ORDER
            // ===============================

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            console.log(
                "Order saved:",
                order
            );


            // ===============================
            // CLEAR CART
            // ===============================

            localStorage.removeItem("cart");


            // ===============================
            // GO TO SUCCESS
            // ===============================

            window.location.href =
                "success.html";

        }
    );

}