let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCounter() {

    const counter = document.getElementById("cart-count");

    if (!counter) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    counter.textContent = total;
}

function addProduct(product) {

    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === product.size
    );

    if(existing){
        existing.quantity += product.quantity;
    }else{
        cart.push(product);
    }

    saveCart();
    updateCartCounter();
}

updateCartCounter();

const cartContainer = document.getElementById("cart-items");

if(cartContainer){

    function displayCart(){

        cartContainer.innerHTML = "";

        let subtotal = 0;

        cart.forEach((item,index)=>{

            subtotal += item.price * item.quantity;

            cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>Size: ${item.size}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <h4>£${(item.price * item.quantity).toFixed(2)}</h4>

                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
            `;
        });

        document.getElementById("subtotal").textContent =
            subtotal.toFixed(2);

        updateCartCounter();
    }

    window.removeItem = function(index){

        cart.splice(index,1);

        saveCart();

        displayCart();

    }

    displayCart();
}