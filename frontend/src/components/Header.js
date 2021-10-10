import { getUserInfo } from "../localStorage.js";

const Header = {
    render: async () => {
        const { name, isAdmin } = getUserInfo();
        console.log(name);
        return `
            <div class="brand">
                <a href="/#/">qShop</a>
            </div>
            <div>
                ${name ? `<a href = "/#/profile/">${name}</a>` : `<a href="/#/signin">Sign-In</a>`}
                <a href="/#/cart">Cart</a>
                ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
            </div>
        `
    },

    after_render: async () => {
        return;
    }
}

export default Header;