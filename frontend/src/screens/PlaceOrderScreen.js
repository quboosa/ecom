import { createOrder } from "../api.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0)
        document.location.hash = "/";

    const shippingInfo = getShipping();
    if (!shippingInfo.address)
        document.location.hash = "/shipping";

    const paymentInfo = getPayment();
    if (!paymentInfo.paymentMethod)
        document.location.hash = "/payment";

    const itemsPrice = orderItems.reduce((a, c) => a + c.qty * c.price, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(itemsPrice * 0.15);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    };
};

const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById("placeorder-button").addEventListener("click", async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if (data.error)
                showMessage(data.error);
            else {
                cleanCart();
                document.location.hash = "/order/" + data.order._id;
            }
        });
    },

    render: () => {
        const { orderItems, shippingInfo, paymentInfo, itemsPrice, shippingPrice, taxPrice, totalPrice } = convertCartToOrder();
        return `
        <div>
            ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })}
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}</div>
                    </div>
                    <div>
                        <h2>Payment Info</h2> 
                        <div>Payment Method : ${paymentInfo.paymentMethod}</div>
                    </div>
                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Shopping Cart</h2>
                                <div>Price</div>
                            </li>
                            ${orderItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                    </div>
                                    <div> Qty : ${item.qty}</div>
                                </div>
                                <div class="cart-price">$${item.price}</div>
                            </li>
                            `)}
                        </ul>
                    </div>
                </div>
            <div class="order-action">
                <ul>
                    <li>
                        <h2>Order Summary</h2>
                    </li>
                    <li>
                        <div>Items</div><div>$${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div><div>$${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div><div>$${taxPrice}</div>
                    </li>
                    <li class="total">
                        <div>Total</div><div>$${totalPrice}</div>
                    </li>
                    <button class="primary fw" type="button" id="placeorder-button">Place Order</button>
                </ul
            </div>
        </div>
        `
    }
};

export default PlaceOrderScreen;