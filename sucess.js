// ===============================
// SUCCESS PAGE
// ===============================

const savedOrder = JSON.parse(
    localStorage.getItem("lastOrder")
);

const successItems =
    document.getElementById("success-items");

const successTotal =
    document.getElementById("success-total");


// ===============================
// CHECK SAVED ORDER
// ===============================

if (!savedOrder) {

    if (successItems) {
        successItems.innerHTML = `
            <p>No order information found.</p>
        `;
    }

    if (successTotal) {
        successTotal.textContent = "0.00";
    }

} else {

    // ===============================
    // DISPLAY ORDER ITEMS
    // ===============================

    if (successItems && savedOrder.items) {

        successItems.innerHTML = "";

        savedOrder.items.forEach(item => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * quantity;

            successItems.innerHTML += `

                <div class="success-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

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

    }


    // ===============================
    // DISPLAY TOTAL
    // ===============================

    if (successTotal) {

        successTotal.textContent =
            Number(savedOrder.total || 0).toFixed(2);

    }


    // ===============================
    // CUSTOMER DETAILS
    // ===============================

    if (savedOrder.customer) {

        const customer =
            savedOrder.customer;

        const customerDetails =
            document.createElement("div");

        customerDetails.className =
            "customer-details";

        customerDetails.innerHTML = `

            <h2>Delivery Details</h2>

            <div class="customer-info">

                <p>
                    <strong>Name:</strong>
                    ${customer.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${customer.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${customer.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${customer.address}
                </p>

                <p>
                    <strong>City:</strong>
                    ${customer.city}
                </p>

                <p>
                    <strong>Postcode:</strong>
                    ${customer.postcode}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${customer.country}
                </p>

            </div>

        `;

        const orderConfirmation =
            document.querySelector(
                ".order-confirmation"
            );

        if (orderConfirmation) {

            orderConfirmation.parentNode.insertBefore(
                customerDetails,
                orderConfirmation
            );

        }

    }

}