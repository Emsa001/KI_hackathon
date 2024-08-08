import axios from "axios";
const API = "http://localhost:5555/message/";

async function AIRequst(input) {
    try {
        console.log(input);
        const response = await axios.post(API, {
            input,
        });
        return response;
    } catch (error) {
        console.error(error);
        // Handle the error here
        return error.response;
    }
}

export { AIRequst };