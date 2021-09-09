import { apiUrl } from "./config.js";
import { getUserInfo } from "./localStorage.js";

// Aded axios with cdn in index.html
// import axios from 'axios'; 

export const getProduct = async (id) => {
    try {
        const response = await axios({
            url: apiUrl + "/api/products/" + id,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.statusText !== 'OK')
            throw new Error(response.data.message);

        return response.data;
    }
    catch (error) {
        console.log(error.response.data.message);
        return { error: error.response.data.message || error.message };
    }
}

export const signin = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email,
                password
            }
        })

        if (response.statusText !== "OK")
            throw new Error(response.data.message);
        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
}

export const register = async ({ name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                name,
                email,
                password
            }
        })

        if (response.statusText !== "OK")
            throw new Error(response.data.message);
        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
}

export const update = async ({ name, email, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data: {
                name,
                email,
                password
            }
        })

        if (response.statusText !== "OK")
            throw new Error(response.data.message);
        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
}

export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data: order,
        });

        if (response.statusText !== "Created")
            throw new Error(response.data.message);
        else
            return response.data;
    }
    catch (error) {
        return { error: error.response ? error.response.data.message : error.message };
    }
};

export const getOrder = async (id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.statusText !== "OK")
            throw new Error(response.data.message);
        else
            return response.data;
    }
    catch (err) {
        return { error: err.mesage };
    }
}

export const payOrder = async (orderId, paymentResult) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/pay`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: paymentResult,
        });

        if (response.statusText !== "OK")
            throw new Error(response.data.message);
        else
            return response.data;
    }
    catch (error) {
        return { error: error.response ? error.response.data.message : error.message };
    }
}