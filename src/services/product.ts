import axios from "axios";
axios.defaults.withCredentials=true
export async function getProduct(keyName:string,url:null|string){
    try {
        return await axios.get(url ? url : '/api/product?name='+keyName)
    } catch (error) {
        return error
    }
}