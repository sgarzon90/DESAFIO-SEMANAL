document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelectorAll('.button--add');
    const removeButton = document.querySelectorAll('.button--remove');
    const cartQuantity = document.querySelectorAll('.quantity');
    const cartModal = document.getElementById('cartModal');
    const cartSummary = document.getElementById('cartSummary');
    const closeButton = document.querySelector('.close');
    let quantities = new Array(cartQuantity.length).fill(0);

    addButton.forEach((button, index) => {
        button.addEventListener('click', function () {
            quantities[index]++;
            cartQuantity[index].innerText = quantities[index];
            updateCartCounter();
        });
    });


    removeButton.forEach((button, index) => {
        button.addEventListener('click', function () {
            if (quantities[index] > 0) {
                quantities[index]--;
                cartQuantity[index].innerText = quantities[index];
                updateCartCounter();
            }
        });
    });


    function updateCartCounter() {
        const totalCartItems = quantities.reduce((total, quantity) => total + quantity, 0);
        document.querySelector('.cart__quantity').innerText = totalCartItems.toString();
    }

    function showCart() {

        cartModal.style.display = 'block';
        cartSummary.innerHTML = '';
        let totalPrice = 0;

        cartQuantity.forEach((quantity, index) => {
            if (parseInt(quantity.innerText) > 0) {
                const productName = quantity.parentElement.parentElement.querySelector('.card__title').innerText;
                const productPrice = quantity.parentElement.parentElement.querySelector('.card__price').innerText;
                const itemPrice = parseFloat(productPrice.replace(',', '.'));
                const itemTotalPrice = itemPrice * parseInt(quantity.innerText);
                totalPrice += itemTotalPrice;

                const cartItem = document.createElement('div');
                cartItem.innerHTML = `<p>${productName} - Cantidad: ${quantity.innerText} - Precio total: ${itemTotalPrice.toFixed(2)}</p>`;
                cartSummary.appendChild(cartItem);
            }
        });

        const totalCartItem = document.createElement('div');
        totalCartItem.innerHTML = `<p> <strong> Precio total del carrito: ${totalPrice.toFixed(2)}</strong></p>`;
        cartSummary.appendChild(totalCartItem);

        const buyButton = document.createElement('button');
        buyButton.innerText = 'Comprar';
        buyButton.classList.add('button-cart');
        buyButton.addEventListener('click', redirectToCheckout);
        cartSummary.appendChild(buyButton);
    }

    function redirectToCheckout() {

        const selectedProducts = [];

        cartQuantity.forEach((quantity, index) => {
            if (parseInt(quantity.innerText) > 0) {
                const productName = quantity.parentElement.parentElement.querySelector('.card__title').innerText;
                const productPrice = quantity.parentElement.parentElement.querySelector('.card__price').innerText;
                selectedProducts.push({
                    name: productName,
                    price: productPrice,
                    quantity: parseInt(quantity.innerText)
                });
            }
        });

        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        window.location.href = 'form.html';

    }

    const cartIcon = document.querySelector('.navbar__cart');
    cartIcon.addEventListener('click', function () {
        showCart();
    });

    closeButton.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });


});