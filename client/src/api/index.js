import axios from "axios";
const API = "http://localhost:5555";

async function AIRequst(input) {
    try {
        console.log(input);
        const response = await axios.post(`${API}/message`, {
            input,
        });
        return response;
    } catch (error) {
        console.error(error);
        // Handle the error here
        return error.response;
    }
}

async function getRequest(url){
    try{
        const response = await axios.get(`${url}`);
        return response;
    }catch(error){
        return error.response;
    }
}

export { AIRequst, getRequest };