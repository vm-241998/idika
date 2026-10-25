document.addEventListener("DOMContentLoaded", function () {
    const packOptions = document.querySelectorAll('input[name="cheese-pack"]');
    const price = document.getElementById("cheese-price");
    const priceNote = document.getElementById("cheese-price-note");
    const quantityInput = document.getElementById("cheese-quantity");
    const buyButton = document.getElementById("buy-cheese-now");

    packOptions.forEach(function (option) {
        option.addEventListener("change", function () {
            if (option.dataset.price) {
                price.textContent = `₹${option.dataset.price}`;
                priceNote.textContent = `${option.value} pack · Inclusive of all taxes`;
            } else {
                price.textContent = "Price varies";
                priceNote.textContent = `Please confirm the price for the ${option.value} pack`;
            }
        });
    });

    document.querySelectorAll("[data-quantity-change]").forEach(function (button) {
        button.addEventListener("click", function () {
            if (!quantityInput) return;
            const currentQuantity = Number(quantityInput.value);
            const change = Number(button.dataset.quantityChange);
            quantityInput.value = String(Math.min(99, Math.max(1, currentQuantity + change)));
        });
    });

    buyButton.addEventListener("click", function () {
        const selectedPack = document.querySelector('input[name="cheese-pack"]:checked');
        const subject = "Order enquiry: Idika Cheese";
        const quantity = quantityInput ? quantityInput.value : "1";
        const body = `Hello, I would like to order Idika Cheese.\nPack: ${selectedPack.value}\nQuantity: ${quantity}\nPlease confirm availability and price.`;
        window.location.href = `mailto:hello@zaikajaroori.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

});
