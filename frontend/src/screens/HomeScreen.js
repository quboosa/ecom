import { getProducts } from "../api.js";
import Rating from "../components/rating.js";

const HomeScreen = {
    render: async () => {
        // const response = await fetch("http://localhost:3000/api/products", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // // console.log(response);
        // if (!response || !response.ok)
        //     return `<div>Error in getting data<div>`;

        // const products = await response.json();
        const products = await getProducts();
        console.log("Check");
        console.log(products);
        return `
        <ul class="products">
            ${products.map(product =>
            `
                <li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}">
                        </a>
                    </div>
                    <div class="product-name">
                        <a href="#/product/1">${product.name}</a>
                    </div>
                    <div class="product-rating">${Rating.render({ value: product.rating, text: product.numReviews + ' reviews' })}</div>
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-price">$${product.price}</div>
                </li>
            `
        ).join("\n")}
        </ul> 
        `
    }
}

export default HomeScreen;