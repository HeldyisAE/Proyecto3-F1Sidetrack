const CART_KEY = "cart";

export function getCart() {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

function getCartKey() {

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!user) return "cart_guest";

    return `cart_${user.username}`;
}

export function addToCart(product) {

    const cart = getCart();

    const existingProduct =
        cart.find(
            item => item.id === product.id
        );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        getCartKey(),
        JSON.stringify(cart)
    );
}

export function removeFromCart(productId) {

    const cart = getCart().filter(
        item => item.id !== productId
    );

    localStorage.setItem(
        getCartKey(),
        JSON.stringify(cart)
    );
}

export function clearCart() {
    localStorage.removeItem(getCartKey());
}