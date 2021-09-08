import CheckoutSteps from "../components/CheckoutSteps.js";
import { getUserInfo, setPayment } from "../localStorage.js";

const PaymentScreen = {
    after_render: () => {
        document.getElementById("payment-form").addEventListener("submit", async e => {
            e.preventDefault();
            setPayment({ paymentMethod: document.querySelector("input[name=payment-method]:checked").value });
            document.location.hash = "/placeorder";
        });
    },

    render: () => {
        const { name } = getUserInfo();
        if (!name) {
            document.location.hash = "/";
        }

        return `
        ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
        <div class = "form-container">
            <form id = "payment-form">
                <ul class = "form-items">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="payment-method" value="Card" id="card" checked/>
                            <label for="card">Card</label>
                            <input type="radio" name="payment-method" value="UPI" id="upi"/>
                            <label for="upi">UPI</label>
                        </div>
                    </li>
                    <li>
                        <button type = "submit" class = "primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default PaymentScreen;