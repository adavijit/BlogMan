import axios from "axios"

/**
 * Creating instance of axios
 * This will be useful if we want to add a global interceptor or headers
 */
const http = axios.create();

export default http;