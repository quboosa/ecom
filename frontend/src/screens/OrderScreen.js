import { deliverOrder, getOrder, payOrder } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils.js";

const OrderScreen = {
    after_render: async () => {
        const payButton = document.getElementById("pay-button");
        const deliverButton = document.getElementById("deliver-order-button");

        if (payButton) {
            payButton.addEventListener("click", async () => {
                const orderId = parseRequestUrl().id;
                const paymentResult = {
                    payerId: orderId,
                    payementId: orderId,
                    orderId: orderId,
                };
                const response = await payOrder(orderId, paymentResult);
                if (!response.error) {
                    await rerender(OrderScreen);
                }
                else {
                    showMessage(response.error)
                }
            });
        }

        if (deliverButton) {
            deliverButton.addEventListener("click", async () => {
                console.log("del but");
                showLoading();
                const orderId = parseRequestUrl().id;
                const response = await deliverOrder(orderId);
                hideLoading();
                showMessage("Order Delivered");
                if (!response.error) {
                    await rerender(OrderScreen);
                }
                else {
                    showMessage(response.error)
                }
            });
        }
    },

    render: async () => {
        const request = parseRequestUrl();
        const { isAdmin } = getUserInfo();
        const { _id, shippingInfo, paymentInfo, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, isDelivered, deliveredOn, isPaid, paidOn } = await getOrder(request.id);
        console.log('isdelivered', isDelivered);
        return `
        <div>
        <h1>Order ${_id}</h1>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}</div>
                        ${isDelivered ? `<div class="success">Delivered On ${deliveredOn}</div>` : `<div class="error">Not Delivered</div>`}
                    </div>
                    <div>
                        <h2>Payment Info</h2> 
                        <div>Payment Method : ${paymentInfo.paymentMethod}</div>
                        ${isPaid ? `<div class="success">Delivered On ${paidOn}</div>` : `<div class="error">Not Paid</div>`}
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
                    ${!isPaid ? ` <li> <button type="button" class="primary fw" id="pay-button">Pay Now</button> </li> ` : ``}
                    ${isPaid && !isDelivered && isAdmin ? ` <li> <button type="button" class="primary fw" id="deliver-order-button">Deliver Order</button> </li> ` : ``}
                </ul
            </div>
        </div>
        `
    }
};

export default OrderScreen;