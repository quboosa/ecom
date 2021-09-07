import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductsScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import SigninScreen from "./screens/SigninScreen.js";

import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductsScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/signin": SigninScreen,
    "/register": RegisterScreen,
    "/profile": ProfileScreen,
}

const router = async () => {
    showLoading();
    const request = parseRequestUrl();

    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? `/:id` : '') +
        (request.action ? `/${request.action}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = await Header.render();
    document.getElementById("header-container").innerHTML = header;
    await Header.after_render();

    const main = document.getElementById("main-container");

    main.innerHTML = await screen.render();
    if (screen.after_render)
        await screen.after_render();
    hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);