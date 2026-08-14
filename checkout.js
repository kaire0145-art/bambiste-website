// ===============================
// BAMBISTE CHECKOUT
// CASH ON DELIVERY
// ===============================


// ===============================
// LOAD CART
// ===============================

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


    // ===============================
    // EMPTY CART
    // ===============================

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


    // ===============================
    // DISPLAY PRODUCTS
    // ===============================

    checkoutCart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;

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
                        Size: ${item.size || "N/A"}
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


    // ===============================
    // DISPLAY TOTALS
    // ===============================

    if (subtotalElement) {

        subtotalElement.textContent =
            total.toFixed(2);

    }

    totalElement.textContent =
        total.toFixed(2);

}


// Run checkout display
displayCheckout();


// ===============================
// COMPLETE ORDER
// ===============================

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();


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
            // GET CUSTOMER DETAILS
            // ===============================

            const customer = {

                name:
                    document.getElementById("fullName").value.trim(),

                email:
                    document.getElementById("email").value.trim(),

                phone:
                    document.getElementById("phone").value.trim(),

                address:
                    document.getElementById("address").value.trim(),

                city:
                    document.getElementById("city").value.trim(),

                postcode:
                    document.getElementById("postcode").value.trim(),

                country:
                    document.getElementById("country").value

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

                paymentMethod: "Cash on Delivery",

                date:
                    new Date().toISOString()

            };


            // ===============================
            // BUTTON
            // ===============================

            const placeOrderButton =
                document.getElementById("place-order");

            if (placeOrderButton) {

                placeOrderButton.disabled = true;

                placeOrderButton.textContent =
                    "Placing Order...";

            }


            // ===============================
            // SEND ORDER TO GODADDY
            // ===============================

            try {

                const response =
                    await fetch(
                        "https://bambiste.co.uk/api/place-order.php",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(order)
                        }
                    );


                const result =
                    await response.json();


                // ===============================
                // SUCCESS
                // ===============================

                if (result.success) {

                    // Save order locally
                    localStorage.setItem(
                        "lastOrder",
                        JSON.stringify(order)
                    );


                    // Clear cart
                    localStorage.removeItem("cart");


                    // Go to success page
                    window.location.href =
                        "success.html";

                    return;
                }


                // ===============================
                // SERVER ERROR
                // ===============================

                alert(
                    result.message ||
                    "Something went wrong while placing your order."
                );


            } catch (error) {

                console.error(
                    "Order submission error:",
                    error
                );


                alert(
                    "We could not connect to the order system. Please try again."
                );

            }


            // ===============================
            // RESET BUTTON
            // ===============================

            if (placeOrderButton) {

                placeOrderButton.disabled = false;

                placeOrderButton.textContent =
                    "Complete Order";

            }

        }
    );

}
