import { getUserInfo } from "../localStorage.js";

const Header = {
    render: () => {
        const name = getUserInfo().name;
        console.log(name);
        return `
            <div class="brand">
                <a href="/#/">qShop</a>
            </div>
            <div>
                ${name ? `<a href = "/#/profile/">${name}</a>` : `<a href="/#/signin">Sign-In</a>`}
                <a href="/#/cart">Cart</a>
            </div>
        `
    },

    after_render: () => {
        return;
    }
}

export default Header;