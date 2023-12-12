document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    const checkoutSummary = document.getElementById('checkoutSummary');
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullname = document.getElementById('id-fullname').value;
        const email = document.getElementById('id-email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,15}$/;
        const addressRegex = /^[a-zA-Z0-9\s,'#-]*$/;

        if (!validateField(fullname, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
            alert('Por favor, ingresa un nombre válido (solo letras y espacios).');
            return;
        }

        if (!validateField(email, emailRegex)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!validateField(phone, phoneRegex)) {
            alert('Por favor, ingresa un número de teléfono válido (solo números de 7 a 15 dígitos).');
            return;
        }

        if (!validateField(address, addressRegex)) {
            alert('Por favor, ingresa una dirección válida (solo letras, números y caracteres especiales como , \' -).');
            return;
        }

        const orderCode = generateOrderCode();
        const observations = document.getElementById('id-observations').value;

        alert(`¡Compra realizada con éxito!, tú pedido fue enviado al restaurante y será despachado en breve. Tu código de pedido es:  ${orderCode}`);
        window.location.href = 'index.html';
    });

    function validateField(value, regex) {
        return regex.test(value);

    }

    function generateOrderCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 8;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }



    if (storedSelectedProducts) {
        const selectedProducts = JSON.parse(storedSelectedProducts);
        let totalPrice = 0;

        selectedProducts.forEach(product => {
            const itemTotalPrice = parseFloat(product.price.replace(',', '.')) * product.quantity;
            totalPrice += itemTotalPrice;

            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${product.name} - Cantidad: ${product.quantity} - Precio total: ${itemTotalPrice.toFixed(2)}</p>`;
            checkoutSummary.appendChild(cartItem);
        });

        const totalCartItem = document.createElement('div');
        totalCartItem.innerHTML = `<p><strong>Precio total del carrito: ${totalPrice.toFixed(2)}</strong></p>`;
        checkoutSummary.appendChild(totalCartItem);
    }
});