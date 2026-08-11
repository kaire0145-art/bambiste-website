// ===============================
// SUCCESS PAGE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // LOAD SAVED ORDER
    // ===============================

    const savedOrder =
        JSON.parse(localStorage.getItem("lastOrder"));

    console.log("Saved order:", savedOrder);


    // ===============================
    // GET ELEMENTS
    // ===============================

    const successItems =
        document.getElementById("success-items");

    const successTotal =
        document.getElementById("success-total");


    const customerName =
        document.getElementById("customer-name");

    const customerEmail =
        document.getElementById("customer-email");

    const customerPhone =
        document.getElementById("customer-phone");

    const customerAddress =
        document.getElementById("customer-address");

    const customerCity =
        document.getElementById("customer-city");

    const customerPostcode =
        document.getElementById("customer-postcode");

    const customerCountry =
        document.getElementById("customer-country");


    // ===============================
    // CHECK ELEMENTS
    // ===============================

    if (!successItems || !successTotal) {

        console.error(
            "Success page elements are missing."
        );

        return;
    }


    // ===============================
    // CHECK ORDER
    // ===============================

    if (!savedOrder) {

        successItems.innerHTML = `
            <p>No order information found.</p>
        `;

        successTotal.textContent = "0.00";

        return;
    }


    console.log(
        "Order items:",
        savedOrder.items
    );


    // ===============================
    // DISPLAY PRODUCTS
    // ===============================

    successItems.innerHTML = "";

    let calculatedTotal = 0;


    if (
        Array.isArray(savedOrder.items) &&
        savedOrder.items.length > 0
    ) {

        savedOrder.items.forEach(item => {

            const price =
                parseFloat(item.price) || 0;

            const quantity =
                parseInt(item.quantity) || 1;

            const itemTotal =
                price * quantity;


            calculatedTotal += itemTotal;


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

    } else {

        successItems.innerHTML = `
            <p>No products found.</p>
        `;

    }


    // ===============================
    // DISPLAY TOTAL
    // ===============================

    // Calculate from the products rather than
    // relying only on savedOrder.total.

    successTotal.textContent =
        calculatedTotal.toFixed(2);


    console.log(
        "Calculated order total:",
        calculatedTotal
    );


    // ===============================
    // DISPLAY CUSTOMER DETAILS
    // ===============================

    if (savedOrder.customer) {

        const customer =
            savedOrder.customer;


        if (customerName) {
            customerName.textContent =
                customer.name || "";
        }

        if (customerEmail) {
            customerEmail.textContent =
                customer.email || "";
        }

        if (customerPhone) {
            customerPhone.textContent =
                customer.phone || "";
        }

        if (customerAddress) {
            customerAddress.textContent =
                customer.address || "";
        }

        if (customerCity) {
            customerCity.textContent =
                customer.city || "";
        }

        if (customerPostcode) {
            customerPostcode.textContent =
                customer.postcode || "";
        }

        if (customerCountry) {
            customerCountry.textContent =
                customer.country || "";
        }

    }

});
