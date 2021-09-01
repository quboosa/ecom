import { apiUrl } from "./config.js";

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