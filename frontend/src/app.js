import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductsScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductsScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen
}

const router = async () => {
    const request = parseRequestUrl();

    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? `/:id` : '') +
        (request.action ? `/${request.action}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const main = document.getElementById("main-container");

    main.innerHTML = await screen.render();
    if (screen.after_render)
        await screen.after_render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);