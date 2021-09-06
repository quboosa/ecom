import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);

    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map(x => {
                return x.product === existItem.product ? item : x;
            });
        }
    }
    else
        cartItems = [...cartItems, item];

    setCartItems(cartItems);
    if (forceUpdate)
        rerender(CartScreen);
}
// const removeFromCart = id => {
// }

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName("qty-select");
        [...qtySelects].forEach(qtySelect => {
            qtySelect.addEventListener("change", e => {
                let cartItems = getCartItems();
                const item = cartItems.find(x => x.product === qtySelect.id);
                item.qty = Number(qtySelect.value);
                addToCart(item, true);
            })
        })

        const deleteButtons = document.getElementsByClassName("delete-button");
        [...deleteButtons].forEach(delButton => {
            delButton.addEventListener("click", e => {
                let cartItems = getCartItems();
                cartItems = cartItems.filter(x => x.product !== delButton.id);
                setCartItems(cartItems);
                document.location.hash = "/cart";
                rerender(CartScreen);
            })
        })

        document.getElementById("checkout-button").addEventListener("click", e => {
            document.location.hash = "/signin";
        })
    },


    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);

            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1
            });
        }
        const cartItems = getCartItems();

        return `
            <div class = "cart content" >
                <div class = "cart-list">
                    <ul class = "cart-list-container">
                        <li>
                            <h3>Shopping cart</h3>
                            <div>Price</div>
                        </li>
                        ${cartItems.length === 0 ? `<div>Cart is Empty. <a href = "/#/">Go Shopping!</a></div>` :
                cartItems.map(item => `
                        <li>
                            <div class = "cart-image"><img src = "${item.image}" alt = "${item.name}"></img></div>
                            <div class = "cart-name">
                                <div class = "product-name">
                                    <a href = "/#/product/${item.product}">${item.name}</a>
                                </div>
                                <div> 
                                    <select class = "qty-select" id = ${item.product}>
                                        Qty : ${[...Array(item.countInStock).keys()].map(x => item.qty === x + 1 ?
                    `<option selected value = "${x + 1}">${x + 1}</option>` :
                    `<option value = "${x + 1}">${x + 1}</option>`)}
                                    </select>
                                    <button type = "button" class = "delete-button" id = "${item.product}">Delete</button>
                                </div> 
                            </div>
                            <div class = "cart-price">$${item.price}</div>
                        </li>
                        `).join("\n")}
                    </ul >
                </div >
    <div class="cart-action">
        <h3>Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)}) : $${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}</h3>
        <button id="checkout-button" class="primary fw">Proceed to Checkout!</button>
    </div>
            </div >
    `;
    }
}

export default CartScreen;