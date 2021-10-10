import { apiUrl } from "./config.js";
import { getUserInfo } from "./localStorage.js";

// Aded axios with cdn in index.html
// import axios from 'axios'; 
export const getProducts = async () => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log("Coudnt get products");
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

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

export const getMyOrders = async () => {
    const { token } = getUserInfo();
    try {
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.statusText != "OK")
            throw new Error(response.data.mesage);
        else
            return response.data;
    }
    catch (error) {
        return { error: error.response ? error.response.data.message : error.message };
    }
}

export const getSummary = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/summary`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        } else {
            return response.data;
        }
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message };
    }
};

export const createProduct = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const deleteProduct = async (productId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const getOrders = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const updateProduct = async (product) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${product._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: product,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const uploadProductImage = async (formData) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/uploads`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        });
        console.log(response.statusText);
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        } else {
            return response.data;
        }
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const deliverOrder = async (orderId) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/deliver`,
            method: "PUT",
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
    catch (error) {
        return { error: error.response ? error.response.data.message : error.message };
    }
}