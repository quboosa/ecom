export const getCartItems = () => {
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
    return cartItems;
}

export const setCartItems = cartItems => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


export const setUserInfo = data => {
    data._id = data._id || "";
    data.name = data.name || "";
    data.email = data.email || "";
    data.password = data.password || "";
    data.token = data.token || "";
    data.isAdmin = data.isAdmin || "";
    localStorage.setItem("userInfo", JSON.stringify(data));
};
export const getUserInfo = () => {
    return localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : { name: "", email: "", password: "" };
}

export const clearUser = () => {
    localStorage.removeItem("userInfo");
}